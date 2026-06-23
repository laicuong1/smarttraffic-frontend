import { render, screen } from '@testing-library/react';
import { test, expect } from 'vitest';
import TrafficLight from '../TrafficLight';

test('TrafficLight renders location and active phase', () => {
  render(<TrafficLight location="Hoàn Kiếm" />);
  expect(screen.getByText('Hoàn Kiếm')).toBeInTheDocument();
  expect(screen.getByText(/Đèn thông minh/i)).toBeInTheDocument();
});
