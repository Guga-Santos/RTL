import { screen } from '@testing-library/react';
import React from 'react';
import About from '../components/About';
import renderWithRouter from './RenderWithRouter';

describe('Teste o componente <About.js />.', () => {
  it('Teste se a página contém as informações sobre a Pokédex', () => {
    renderWithRouter(<About />);

    const aboutText = screen.getByText('About Pokédex');
    const descText = screen.getByText(/a digital encyclopedia containing all pokémons/i);

    expect(aboutText).toBeInTheDocument();
    expect(descText).toBeInTheDocument();
  });

  it('Teste se a página contém um heading h2 com o texto About Pokédex', () => {
    renderWithRouter(<About />);

    const aboutText = screen.getByRole('heading', { level: 2, name: 'About Pokédex' });

    expect(aboutText).toBeInTheDocument();
  });

  it('Teste se a página contém dois parágrafos com texto sobre a Pokédex', () => {
    renderWithRouter(<About />);

    const oneT = 'This application simulates a Pokédex,';
    const twoT = ' a digital encyclopedia containing all Pokémons';

    const threeT = 'One can filter Pokémons by type,';
    const fourT = ' and see more details for each one of them';

    const paragraphOne = screen.getByText(`${oneT}${twoT}`);
    const paragraphTwo = screen.getByText(`${threeT}${fourT}`);

    expect(paragraphOne).toBeInTheDocument();
    expect(paragraphTwo).toBeInTheDocument();
  });

  it('Teste se a página contém a imagem de uma Pokédex', () => {
    renderWithRouter(<About />);

    const URL = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';

    const image = screen.getByRole('img');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', URL);
  });
});
