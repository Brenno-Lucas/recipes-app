import { screen } from '@testing-library/react';
import renderPath from '../helpers/renderPath';

describe('Testa o Header', () => {
  it('Test5', () => {
    global.window = Object.create(window);
    const url = 'http://localhost:3000/favorite-recipes';
    Object.defineProperty(window, 'location', {
      value: {
        href: url,
      },
    });
    renderPath('/favorite-recipes');
    expect(screen.getByText(/Favorite Recipes/i)).toBeInTheDocument();
  });
});
