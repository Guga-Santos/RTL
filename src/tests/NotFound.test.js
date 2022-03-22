import { screen } from '@testing-library/react';
import React from 'react';
import NotFound from '../components/NotFound';
import renderWithRouter from './RenderWithRouter';

describe('Teste o componente <NotFound.js />', () => {
  it('Teste contém um heading h2 com o texto Page requested not found 😭;', () => {
    renderWithRouter(<NotFound />);

    const text = screen
      .getByRole('heading', { level: 2, name: /page requested not found/i });

    expect(text).toBeInTheDocument();
  });

  it('Teste se página mostra a imagem', () => {
    renderWithRouter(<NotFound />);

    const URL = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';

    const image = screen.getByRole('img', { name: /pikachu crying/i });
    expect(image).toBeInTheDocument();

    expect(image).toHaveAttribute('src', URL);
  });
});
