import { screen } from '@testing-library/react';
import React from 'react';
import FavoritePokemons from '../components/FavoritePokemons';
import pokemons from '../data';
import renderWithRouter from './RenderWithRouter';

describe('Teste o componente <FavoritePokemons.js />', () => {
  it('Quando não houver favoritos, é exibido mensagem na tela', () => {
    renderWithRouter(<FavoritePokemons />);

    const text = screen.getByText(/No favorite pokemon found/i);

    expect(text).toBeInTheDocument();
  });

  it('Testa se é exibido todos os cards de pokemons favoritados', () => {
    renderWithRouter(<FavoritePokemons pokemons={ pokemons } />);

    const DATALENGTH = 9;

    const favorites = screen.getAllByTestId('pokemon-name');
    expect(favorites).toHaveLength(DATALENGTH);
  });
});
