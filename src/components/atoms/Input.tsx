type InputProps = {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  placeholder?: string;
  type?: 'text' | 'email' | 'tel' | 'number';
};

export function Input({ label, name, value, onChange, error, placeholder, type = 'text' }: InputProps) {
  return (
    <div className="input-group">
      <label htmlFor={name} className="input-group__label">{label}</label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`input-group__input${error ? ' input-group__input--error' : ''}`}
      />
      {error && <span className="input-group__error">{error}</span>}
    </div>
  );
}
