import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Heart } from 'phosphor-react';
import './styles.scss';
import whiteHeart from '../../images/whiteHeartIcon.svg';
import blackHeart from '../../images/blackHeartIcon.svg';

function FavoriteBtn({ recipe }) {
  const [favorite, setFavorite] = useState(false);

  useEffect(() => {
    const favoriteRecipes = localStorage.getItem('favoriteRecipes');
    if (favoriteRecipes && recipe) {
      setFavorite(JSON.parse(favoriteRecipes)
        .map((favRecipe) => favRecipe.id)
        .includes(recipe?.idDrink || recipe?.idMeal));
    }
  }, [recipe]);

  function deleteFavorite() {
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const newFavorites = favoriteRecipes
      .filter((favRecipe) => favRecipe.id !== recipe?.idDrink || recipe?.idMeal);
    localStorage.setItem('favoriteRecipes', JSON.stringify(newFavorites));
    setFavorite(false);
  }

  function addFavorite() {
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const newRecipe = {
      id: recipe?.idMeal || recipe?.idDrink,
      type: Object.keys(recipe).includes('idDrink') ? 'drink' : 'food',
      nationality: recipe?.strArea || '',
      category: recipe.strCategory,
      alcoholicOrNot: Object.keys(recipe).includes('idDrink') ? recipe.strAlcoholic : '',
      name: recipe?.strMeal || recipe?.strDrink,
      image: recipe?.strMealThumb || recipe?.strDrinkThumb,
    };
    if (favoriteRecipes) {
      localStorage.setItem('favoriteRecipes', JSON
        .stringify([...favoriteRecipes, newRecipe]));
    } else localStorage.setItem('favoriteRecipes', JSON.stringify([newRecipe]));
    setFavorite(true);
  }

  return (
    <div id="favorite-btn">
      {!favorite && (
        <button
          data-testid="favorite-btn"
          type="button"
          src={ whiteHeart }
          onClick={ addFavorite }
        >
          <Heart size={ 40 } color="#7A7AC7" alt="white heart icon" />
        </button>
      )}

      {favorite && (
        <button
          data-testid="favorite-btn"
          type="button"
          src={ blackHeart }
          onClick={ deleteFavorite }
        >
          <Heart size={ 40 } color="#7A7AC7" weight="fill" alt="purple heart icon" />

        </button>
      )}
    </div>
  );
}

export default FavoriteBtn;

FavoriteBtn.propTypes = {
  recipe: PropTypes.shape.isRequired,
};
