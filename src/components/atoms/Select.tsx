type SelectOption = { value: string; label: string };

type SelectProps = {
  label: string;
  name: string;
  value: string;
  options: SelectOption[];
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
};

export function Select({ label, name, value, options, onChange }: SelectProps) {
  return (
    <div className="input-group">
      <label htmlFor={name} className="input-group__label">{label}</label>
      <select
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        className="input-group__input"
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
    </div>
  );
}
