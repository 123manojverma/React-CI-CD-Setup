import { fireEvent, render, screen } from '@testing-library/react';
import { createElement } from 'react';
import { expect, test } from 'vitest';
import App from '../App';

test('renders the Vite starter content', () => {
  render(createElement(App));

  expect(
    screen.getByRole('heading', { name: /get started/i }),
  ).toBeInTheDocument();
  expect(screen.getByText('src/App.jsx')).toBeInTheDocument();
});

test('increments the count when the counter is clicked', () => {
  render(createElement(App));
  const counterButton = screen.getByRole('button', { name: /count is 0/i });

  fireEvent.click(counterButton);
  expect(
    screen.getByRole('button', { name: /count is 1/i }),
  ).toBeInTheDocument();

  fireEvent.click(screen.getByRole('button', { name: /count is 1/i }));
  expect(
    screen.getByRole('button', { name: /count is 2/i }),
  ).toBeInTheDocument();
});
