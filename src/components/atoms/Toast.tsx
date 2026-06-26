import type { ToastType } from '../../hooks/useToast';

type ToastProps = {
  type: ToastType;
  message: string;
  duration: number;
  onClose: () => void;
};

const icons: Record<ToastType, string> = {
  success: '\u2713',
  error: '\u2717',
  pending: '\u25CB',
};

export function Toast({ type, message, duration, onClose }: ToastProps) {
  return (
    <div className={`toast toast--${type}`} role="alert">
      <span className="toast__icon">{icons[type]}</span>
      <p className="toast__message">{message}</p>
      <button className="toast__close" onClick={onClose} aria-label="Cerrar">
        {'\u2715'}
      </button>
      {duration > 0 && (
        <span
          className="toast__progress"
          style={{ animationDuration: `${duration}ms` }}
        />
      )}
    </div>
  );
}
