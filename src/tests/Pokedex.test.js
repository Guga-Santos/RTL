import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import pokemons from '../data';
import renderWithRouter from './RenderWithRouter';

describe('Teste o componente <Pokedex.js />', () => {
  it('Teste se página contém um heading h2 com o texto "Encountered pokémons"', () => {
    renderWithRouter(<App />);

    const text = screen.getByText(/Encountered pokémons/i);

    expect(text).toBeInTheDocument();
  });

  it('Teste se exibe o próximo Pokémon quando o botão Próximo pokémon é clicado', () => {
    renderWithRouter(<App />);

    const nextBtn = screen.getByTestId('next-pokemon');
    const poke = screen.getByTestId(/pokemon-name/i);

    pokemons.forEach((obj) => {
      expect(poke).toHaveTextContent(obj.name);
      userEvent.click(nextBtn);
    });
  });

  it('Teste se é mostrado apenas um Pokémon por vez.', () => {
    renderWithRouter(<App />);

    const pokemon = screen.getAllByTestId('pokemon-name');

    expect(pokemon).toHaveLength(1);
  });

  it('Teste se a Pokédex tem os botões de filtro', () => {
    renderWithRouter(<App />);

    const map = pokemons.map((obj) => obj.type);
    console.log(map)
    const filterDuplicated = [...new Set(map)];

    console.log(filterDuplicated)

    const all = screen.getByRole('button', { name: 'All' });
    const buttons = screen.getAllByTestId('pokemon-type-button');

    expect(all).toBeInTheDocument();
    expect(buttons).toHaveLength(filterDuplicated.length);
  });

  it('Testa se é circulado apenas pelos pokemons do tipo do botão', () => {
    renderWithRouter(<App />);

    const buttons = screen.getAllByTestId('pokemon-type-button');
    const nextBtn = screen.getByTestId('next-pokemon');

    buttons.forEach((btn) => {
      userEvent.click(btn);
      const pokemonType = screen.getByTestId('pokemon-type');
      expect(pokemonType).toHaveTextContent(btn.innerHTML);

      userEvent.click(nextBtn);
      expect(pokemonType).toHaveTextContent(btn.innerHTML);
    });
  });

  it('Teste se a Pokédex contém um botão para resetar o filtro', () => {
    renderWithRouter(<App />);
    const all = screen.getByRole('button', { name: 'All' });
    const nextBtn = screen.getByRole('button', { name: /próximo pokémon/i });
    userEvent.click(all);

    const poke = screen.getByTestId('pokemon-name');
    pokemons.forEach((obj) => {
      expect(poke).toHaveTextContent(obj.name);
      userEvent.click(nextBtn);
    });
  });
});
