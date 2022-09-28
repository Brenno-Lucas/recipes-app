import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { requestMealsByType, requestDrinksByType } from '../redux/actions';

function SearchBar({
  fetchMeals,
  fetchDrinks,
  mealReducer,
  drinkReducer }) {
  const [formData, setFormData] = useState({
    searchInput: '',
    searchType: 'nome',
  });

  const { searchType, searchInput } = formData;
  const { location: { pathname } } = useHistory();
  const history = useHistory();
  const { error: errorMeals, meals } = mealReducer;
  const { error: errorDrinks, drinks } = drinkReducer;
  const pageSearch = pathname.split('/')[1];

  useEffect(() => {
    switch (pathname) {
    case '/meals':
      if (errorMeals) {
        global.alert(errorMeals);
      }
      break;
    default:
      if (errorDrinks) {
        global.alert(errorDrinks);
      }
    }
    if (meals.length === 1) {
      history.push(`${pathname}/${meals[0].idMeal}`);
    }
    if (drinks.length === 1) {
      history.push(`${pathname}/${drinks[0].idDrink}`);
    }
  }, [errorMeals, errorDrinks, meals, history, pathname, pageSearch, drinks]);

  const handleChange = ({ target: { name, value } }) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const searchByType = async (fetchRecipe) => {
    switch (searchType) {
    case 'ingrediente':
      fetchRecipe('filter.php?i=', searchInput);
      break;
    case 'nome':
      fetchRecipe('search.php?s=', searchInput);
      break;
    default:
      if (searchInput.length > 1) {
        global.alert('Your search must have only 1 (one) character');
      } else {
        fetchRecipe('search.php?f=', searchInput);
      }
    }
  };

  const searchRecipes = async () => {
    if (pathname === '/meals') {
      searchByType(fetchMeals);
    } else {
      searchByType(fetchDrinks);
    }
  };

  return (
    <form>
      <input
        type="text"
        name="searchInput"
        data-testid="search-input"
        value={ searchInput }
        onChange={ handleChange }
      />
      <label htmlFor="ingrediente">
        Ingredient
        <input
          type="radio"
          name="searchType"
          value="ingrediente"
          data-testid="ingredient-search-radio"
          onChange={ handleChange }
          checked={ searchType === 'ingrediente' }
        />
      </label>
      <label htmlFor="nome">
        Name
        <input
          type="radio"
          name="searchType"
          value="nome"
          data-testid="name-search-radio"
          onChange={ handleChange }
          checked={ searchType === 'nome' }
        />
      </label>
      <label htmlFor="primeira-letra">
        First letter
        <input
          type="radio"
          name="searchType"
          value="primeira-letra"
          data-testid="first-letter-search-radio"
          onChange={ handleChange }
          checked={ searchType === 'primeira-letra' }
        />
      </label>
      <button
        type="button"
        data-testid="exec-search-btn"
        onClick={ searchRecipes }
      >
        SEARCH
      </button>
    </form>
  );
}

const mapStateToProps = (state) => {
  const { mealReducer, drinkReducer } = state;
  return {
    mealReducer,
    drinkReducer,
  };
};

const mapDispatchToProps = (dispatch) => ({
  fetchMeals: (endpoint, search) => dispatch(requestMealsByType(endpoint, search)),
  fetchDrinks: (endpoint, search) => dispatch(requestDrinksByType(endpoint, search)),
});

SearchBar.propTypes = {
  fetchMeals: PropTypes.func.isRequired,
  fetchDrinks: PropTypes.func.isRequired,
  mealReducer: PropTypes.objectOf(PropTypes.object.isRequired).isRequired,
  drinkReducer: PropTypes.objectOf(PropTypes.object.isRequired).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);
