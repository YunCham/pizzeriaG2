import { useState } from 'react';
import { Button } from '../atoms/Button';
import { FormField } from '../molecules/FormField';

type CheckoutFormValues = {
  nombre: string;
  direccion: string;
  correo: string;
};

type CheckoutFormProps = {
  onSubmit: (values: CheckoutFormValues) => void;
  loading?: boolean;
};

export function CheckoutForm({ onSubmit, loading }: CheckoutFormProps) {
  const [values, setValues] = useState<CheckoutFormValues>({
    nombre: '',
    direccion: '',
    correo: '',
  });
  const [errors, setErrors] = useState<Partial<CheckoutFormValues>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof CheckoutFormValues]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Partial<CheckoutFormValues> = {};
    if (!values.nombre.trim()) newErrors.nombre = 'El nombre es requerido';
    if (!values.direccion.trim()) newErrors.direccion = 'La dirección es requerida';
    if (!values.correo.trim()) newErrors.correo = 'El correo es requerido';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onSubmit(values);
  };

  return (
    <form className="checkout-form" onSubmit={handleSubmit}>
      <h2>Tus datos</h2>
      <FormField label="Nombre" name="nombre" value={values.nombre} onChange={handleChange} error={errors.nombre} />
      <FormField label="Dirección" name="direccion" value={values.direccion} onChange={handleChange} error={errors.direccion} />
      <FormField label="Correo electrónico" name="correo" value={values.correo} onChange={handleChange} type="email" error={errors.correo} />
      <Button type="submit" loading={loading}>
        Confirmar pedido
      </Button>
    </form>
  );
}
