import React from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import IngredientsCards from '../components/IngredientsCards';

export default function ExploreDrinksIngredients() {
  return (
    <>
      <Header title="Explore Ingredients" search={ false } />
      <IngredientsCards param="thecocktaildb" />
      <Footer />
    </>
  );
}
