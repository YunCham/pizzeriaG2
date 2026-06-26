import { Input } from '../atoms/Input';
import { Select } from '../atoms/Select';

type FormFieldProps = {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  error?: string;
  type?: 'text' | 'email' | 'tel' | 'select';
  options?: { value: string; label: string }[];
};

export function FormField({ type = 'text', options = [], ...rest }: FormFieldProps) {
  if (type === 'select') {
    return <Select {...rest} options={options} onChange={rest.onChange as (e: React.ChangeEvent<HTMLSelectElement>) => void} />;
  }
  return <Input {...rest} type={type} />;
}
