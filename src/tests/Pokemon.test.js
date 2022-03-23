import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import pokemons from '../data';
import renderWithRouter from './RenderWithRouter';

describe('Teste o componente <Pokemon.js />', () => {
  it('Teste se é renderizado um card com as informações de determinado pokémon', () => {
    renderWithRouter(<App />);
    const pokemonName = screen.getByTestId('pokemon-name');
    const pokemonType = screen.getByTestId('pokemon-type');
    const pokemonW = screen.getByTestId('pokemon-weight');
    const pokemonImage = screen.getByRole('img');

    const nextBtn = screen.getByRole('button', { name: /próximo pokémon/i });

    pokemons
      .forEach(({ name, type, image, averageWeight: { measurementUnit, value } }) => {
        expect(pokemonName).toHaveTextContent(name);
        expect(pokemonType).toHaveTextContent(type);
        expect(pokemonW).toHaveTextContent(`Average weight: ${value} ${measurementUnit}`);
        expect(pokemonImage).toHaveAttribute('src', image);
        expect(pokemonImage).toHaveAttribute('alt', `${name} sprite`);
        userEvent.click(nextBtn);
      });
  });

  it('Teste se o card do Pokémon indicado na Pokédex contém um link de navegação', () => {
    renderWithRouter(<App />);

    const link = screen.getByRole('link', { name: /more details/i });
    const nextBtn = screen.getByRole('button', { name: /próximo pokémon/i });

    pokemons.forEach((obj) => {
      expect(link).toHaveAttribute('href', `/pokemons/${obj.id}`);
      userEvent.click(nextBtn);
    });
  });

  it('Teste se ao clicar no link de navegação, é feito o redirecionamento', () => {
    const { history } = renderWithRouter(<App />);

    const link = screen.getByRole('link', { name: /more details/i });
    userEvent.click(link);
    const { pathname } = history.location;
    expect(pathname).toBe(`/pokemons/${pokemons[0].id}`);
  });

  it('Teste se existe um ícone de estrela nos Pokémons favoritados.', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/pokemons/25');

    const checkbox = screen.getByRole('checkbox');

    userEvent.click(checkbox);
    const fav = screen.getByRole('img', { name: /pikachu is marked as favorite/i });

    expect(fav).toBeInTheDocument();
    expect(fav).toHaveAttribute('src', '/star-icon.svg');
  });
});
