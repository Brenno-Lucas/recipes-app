import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderPath from '../helpers/renderPath';

describe('Testa o Header', () => {
  it('Testa se os elementos estão presentes, quando a página é renderizada', () => {
    renderPath('/meals');
    expect(screen.getByTestId('profile-top-btn')).toBeInTheDocument();
    expect(screen.getByTestId('page-title')).toBeInTheDocument();
    expect(screen.getByTestId('search-top-btn')).toBeInTheDocument();
  });

  it('Testa o nome da respectiva página é apresentado quando renderizada.', () => {
    global.window = Object.create(window);
    const url = 'http://localhost:3000/meals';
    Object.defineProperty(window, 'location', {
      value: {
        href: url,
      },
    });
    renderPath('/meals');
    expect(screen.getByText('Meals')).toBeInTheDocument();
  });

  it('Testa se o search-input aparece/some quando clicado.', () => {
    global.window = Object.create(window);
    const url = 'http://localhost:3000/meals';
    Object.defineProperty(window, 'location', {
      value: {
        href: url,
      },
    });
    renderPath('/meals');

    const searchIcon = screen.getByAltText('search-icon');
    userEvent.click(searchIcon);
    expect(screen.getByTestId('search-input')).toBeInTheDocument();
    userEvent.click(searchIcon);
    expect(screen.queryByTestId('search-input')).toBeNull();

    expect(window.location.href).toEqual(url);
  });
});
