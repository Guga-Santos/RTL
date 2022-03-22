import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import pokemons from '../data';
import renderWithRouter from './RenderWithRouter';

const poke = screen.getByTestId('pokemon-name');

describe('Teste o componente <Pokedex.js />', () => {
  it('Teste se página contém um heading h2 com o texto "Encountered pokémons"', () => {
    renderWithRouter(<App />);

    const text = screen.getByText(/Encountered pokémons/i);

    expect(text).toBeInTheDocument();
  });

  it('Teste se exibe o próximo Pokémon quando o botão Próximo pokémon é clicado', () => {
    renderWithRouter(<App />);

    const nextBtn = screen.getByTestId('next-pokemon');

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
    const filterDuplicated = [...new Set(map)];

    const all = screen.getByRole('button', { name: 'All' });
    const buttons = screen.getAllByTestId('pokemon-type-button');

    expect(all).toBeInTheDocument();
    expect(buttons).toHaveLength(filterDuplicated.length);
  });

  it('Testa se é circulado apenas pelos pokemons do tipo do botão', () => {
    renderWithRouter(<App />);

    const buttons = screen.getAllByTestId('pokemon-type-button');

    buttons.forEach((btn) => {
      userEvent.click(btn);
      const pokemonType = screen.getByTestId('pokemon-type');
      expect(pokemonType).toHaveTextContent(btn.innerHTML);
    });
  });

  it('Teste se a Pokédex contém um botão para resetar o filtro', () => {
    renderWithRouter(<App />);
    const all = screen.getByRole('button', { name: 'All' });
    const nextBtn = screen.getByRole('button', { name: /próximo pokémon/i });
    userEvent.click(all);

    // Poke é a constante criada acima do describe.

    pokemons.forEach((obj) => {
      expect(poke).toHaveTextContent(obj.name);
      userEvent.click(nextBtn);
    });
  });
});
