import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import pokemons from '../data';
import renderWithRouter from './RenderWithRouter';

describe('Teste o componente <PokemonDetails.js />', () => {
  it('Teste se as informações detalhadas do Pokémon são mostradas na tela.', () => {
    renderWithRouter(<App />);

    const link = screen.getByRole('link', { name: 'More details' });
    userEvent.click(link);

    const title = screen.getByRole('heading', { name: `${pokemons[0].name} Details` });
    expect(title).toBeInTheDocument();
    expect(link).not.toBeInTheDocument();

    const summary = screen.getByRole('heading', { level: 2, name: 'Summary' });
    expect(summary).toBeInTheDocument();
    const details1 = 'This intelligent Pokémon roasts hard berries with';
    const details2 = ' electricity to make them tender enough to eat.';
    const detailSum = screen.getByText(`${details1}${details2}`);
    expect(detailSum).toBeInTheDocument();
  });

  it('Teste se existe uma seção com os mapas contendo as localizações do pokémon', () => {
    renderWithRouter(<App />);

    const link = screen.getByRole('link', { name: 'More details' });
    userEvent.click(link);

    const locationTitle = screen
      .getByRole('heading', { level: 2, name: `Game Locations of ${pokemons[0].name}` });
    expect(locationTitle).toBeInTheDocument();

    const localImg = screen.getAllByRole('img', { name: `${pokemons[0].name} location` });
    expect(localImg).toHaveLength(pokemons[0].foundAt.length);

    pokemons[0].foundAt.forEach((obj, index) => {
      const location = screen.getByText(obj.location);
      expect(location).toBeInTheDocument();
      const images = screen.getAllByRole('img', { name: `${pokemons[0].name} location`});

      expect(images[index]).toHaveAttribute('alt', `${pokemons[0].name} location`);
      expect(images[index]).toHaveAttribute('src', obj.map);

    });
  });

  it('Teste se o usuário pode favoritar o pokémon através da página de detalhes.', () => {
    renderWithRouter(<App />);

    const link = screen.getByRole('link', { name: /More details/i });
    userEvent.click(link);

    const checkbox = screen.getByRole('checkbox', { name: /pokémon favoritado\?/i });
    expect(checkbox).toBeInTheDocument();

    userEvent.click(checkbox);
    const fav = screen.getByRole('img', { name: /pikachu is marked/i });
    expect(fav).toBeInTheDocument();
    userEvent.click(checkbox);
    expect(fav).not.toBeInTheDocument();
  });
});
