import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { StatusBadge } from './StatusBadge';

describe('StatusBadge', () => {
  it('renders Pendiente for pendiente status', () => {
    render(<StatusBadge estado="pendiente" />);
    expect(screen.getByText('Pendiente')).toBeInTheDocument();
  });

  it('renders Entregado for entregado status', () => {
    render(<StatusBadge estado="entregado" />);
    expect(screen.getByText('Entregado')).toBeInTheDocument();
  });

  it('renders Rechazado for rechazado status', () => {
    render(<StatusBadge estado="rechazado" />);
    expect(screen.getByText('Rechazado')).toBeInTheDocument();
  });
});
