type ItemRowProps = {
  nombre: string;
  cantidad: number;
  max?: number;
  onIncrement: () => void;
  onDecrement: () => void;
};

export function ItemRow({ nombre, cantidad, max, onIncrement, onDecrement }: ItemRowProps) {
  return (
    <div className="item-row">
      <span className="item-row__name">{nombre}</span>
      <div className="item-row__controls">
        <button type="button" className="item-row__btn" onClick={onDecrement} disabled={cantidad <= 0}>
          −
        </button>
        <span className="item-row__qty">{cantidad}</span>
        <button type="button" className="item-row__btn" onClick={onIncrement} disabled={max !== undefined && cantidad >= max}>
          +
        </button>
      </div>
    </div>
  );
}
