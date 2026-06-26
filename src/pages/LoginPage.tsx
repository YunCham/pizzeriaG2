import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../hooks/auth-context';
import { useToast } from '../hooks/useToast';
import { loginSchema } from '../features/auth/schemas';
import type { LoginFormData } from '../features/auth/schemas';
import { Button } from '../components/atoms/Button';
import { FormField } from '../components/molecules/FormField';

export default function LoginPage() {
  const { login, loading, error } = useAuth();
  const { addToast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: { correo: '' },
  });

  // required cast: location.state is typed as unknown by react-router
  const from = (location.state as { from?: string })?.from || '/';

  const onSubmit = async (data: LoginFormData) => {
    try {
      await login(data.correo);
      addToast('success', 'Sesión iniciada correctamente');
      navigate(from, { replace: true });
    } catch {
      /* error is set in AuthProvider context */
    }
  };

  return (
    <section className="page">
      <h1>Iniciar Sesión</h1>
      <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
        {(error || errors.correo) && (
          <div className="page__error">{error || errors.correo?.message}</div>
        )}
        <Controller
          name="correo"
          control={control}
          render={({ field }) => (
            <FormField
              label="Correo electrónico"
              name={field.name}
              value={field.value ?? ''}
              onChange={(e) => field.onChange(e.target.value)}
              error={errors.correo?.message}
              type="email"
            />
          )}
        />
        <p className="login-form__hint">
          Usa tu correo registrado. Ej: carlos@email.com
        </p>
        <div className="login-form__actions">
          <Button type="submit" loading={loading}>
            Entrar
          </Button>
          <Link to="/" className="btn btn--ghost">
            Seguir como invitado
          </Link>
        </div>
      </form>
    </section>
  );
}