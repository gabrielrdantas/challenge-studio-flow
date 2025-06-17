import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './index';

jest.mock('../header', () => ({
  Header: () => <div data-testid='header'>Header</div>,
}));

jest.mock('../sidebar', () => ({
  Sidebar: () => <div data-testid='sidebar'>Sidebar</div>,
}));

describe('Layout component', () => {
  it('deve renderizar Header, Sidebar e Outlet (conteúdo da rota)', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route
            path="/"
            element={<Layout />}
          >
            <Route
              index
              element={<div data-testid='outlet-content'>teste</div>}
            />
          </Route>
        </Routes>
      </MemoryRouter>,
    );

    expect(screen.getByTestId('header')).toBeInTheDocument();
    expect(screen.getByTestId('sidebar')).toBeInTheDocument();
    expect(screen.getByTestId('outlet-content')).toBeInTheDocument();
  });
});
