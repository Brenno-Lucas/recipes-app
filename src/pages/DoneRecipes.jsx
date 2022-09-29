import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import SimpleFilter from '../components/SimpleFilter';
import DoneCard from '../components/DoneCard';

function DoneRecipes({ filterType }) {
  const [doneRecipesList, setDoneRecipesList] = useState([]);
  const [doneAllList, setDoneAllList] = useState([]);
  const [doneMealsList, setDoneMealsList] = useState([]);
  const [doneDrinksList, setDoneDrinksList] = useState([]);

  useEffect(() => {
    const filterListByType = (list, recipeType) => (
      list.filter(({ type }) => type === recipeType));

    const storageDoneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));

    if (storageDoneRecipes) {
      const storageDoneMeals = filterListByType(storageDoneRecipes, 'meal');
      const storageDoneDrinks = filterListByType(storageDoneRecipes, 'drink');
      setDoneAllList(storageDoneRecipes);
      setDoneMealsList(storageDoneMeals);
      setDoneDrinksList(storageDoneDrinks);
    }
  }, []);

  useEffect(() => {
    switch (filterType) {
    case 'all':
      setDoneRecipesList([...doneAllList]);
      break;
    case 'meals':
      setDoneRecipesList([...doneMealsList]);
      break;
    default:
      setDoneRecipesList([...doneDrinksList]);
    }
  }, [filterType, doneAllList, doneMealsList, doneDrinksList]);

  return (
    <div>
      <Header />
      <SimpleFilter />
      {
        doneRecipesList.map((recipe, index) => (
          <DoneCard key={ index } index={ index } recipe={ recipe } />
        ))
      }
    </div>
  );
}

DoneRecipes.propTypes = {
  filterType: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  filterType: state.filterReducer.type,
});

export default connect(mapStateToProps)(DoneRecipes);
