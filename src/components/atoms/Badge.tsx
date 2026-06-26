type BadgeVariant = 'success' | 'warning' | 'danger' | 'info' | 'default';

type BadgeProps = {
  children: React.ReactNode;
  variant?: BadgeVariant;
};

const variantMap: Record<BadgeVariant, string> = {
  success: 'badge--success',
  warning: 'badge--warning',
  danger: 'badge--danger',
  info: 'badge--info',
  default: 'badge--default',
};

export function Badge({ children, variant = 'default' }: BadgeProps) {
  return (
    <span className={`badge ${variantMap[variant]}`}>
      {children}
    </span>
  );
}
