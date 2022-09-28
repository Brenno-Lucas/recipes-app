import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import SimpleFilter from '../components/SimpleFilter';
import FavoriteRecipesList from '../components/FavoriteRecipesList';
// * Local Storage para testes locais;
// import mockLocalStorageFavorite from '../utils/helpers/mockLocalStorage';

function FavoriteRecipes({ filterType }) {
  const [favoriteRecipesList, setFavoriteRecipesList] = useState([]);
  const [favoriteAllList, setFavoriteAllList] = useState([]);
  const [favoriteMealsList, setFavoriteMealsList] = useState([]);
  const [favoriteDrinksList, setFavoriteDrinksList] = useState([]);

  useEffect(() => {
    // * Local Storage para testes locais;
    // localStorage.setItem('favoriteRecipes', JSON.stringify(mockLocalStorageFavorite));

    const filterListByType = (list, recipeType) => (
      list.filter(({ type }) => type === recipeType));

    const storageFavoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));

    if (storageFavoriteRecipes) {
      const storageFavoriteMeals = filterListByType(storageFavoriteRecipes, 'meal');
      const storageFavoriteDrinks = filterListByType(storageFavoriteRecipes, 'drink');
      setFavoriteAllList(storageFavoriteRecipes);
      setFavoriteMealsList(storageFavoriteMeals);
      setFavoriteDrinksList(storageFavoriteDrinks);
    }
  }, []);

  useEffect(() => {
    switch (filterType) {
    case 'all':
      setFavoriteRecipesList([...favoriteAllList]);
      break;
    case 'meals':
      setFavoriteRecipesList([...favoriteMealsList]);
      break;
    default:
      setFavoriteRecipesList([...favoriteDrinksList]);
    }
  }, [filterType, favoriteAllList, favoriteMealsList, favoriteDrinksList]);

  return (
    <main>
      <Header />
      <SimpleFilter />
      <FavoriteRecipesList list={ favoriteRecipesList } />
    </main>
  );
}

FavoriteRecipes.propTypes = {
  filterType: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  filterType: state.filterReducer.type,
});

export default connect(mapStateToProps)(FavoriteRecipes);
