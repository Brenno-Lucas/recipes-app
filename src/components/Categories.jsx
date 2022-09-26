import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  requestDrinks,
  requestDrinksByCategory,
  requestMeals,
  requestMealsByCategory,
} from '../redux/actions';
import { fetchMealsCategories } from '../services/mealsApi';
import { fetchDrinksCategories } from '../services/drinksApi';
import { MAX_CATEGORIES_QUANTITY } from '../utils/constants';
import CategoryCard from './CategoryCard';

function Categories(props) {
  const {
    fetchMealsByCategory,
    fetchDrinksByCategory,
    fetchAllMeals,
    fetchAllDrinks,
  } = props;
  const [categories, setCategories] = useState([]);
  const [activeFilter, setActiveFilter] = useState('All');
  const { location: { pathname } } = useHistory();

  const handleCategoryFilter = (categoryName) => {
    if (pathname === '/meals') {
      fetchMealsByCategory(categoryName);
    } else {
      fetchDrinksByCategory(categoryName);
    }
  };

  const handleAllCategoryFilter = () => {
    if (pathname === '/meals') {
      fetchAllMeals();
    } else {
      fetchAllDrinks();
    }
  };

  useEffect(() => {
    const requestCategories = async () => {
      const recipeCategories = pathname === '/meals'
        ? await fetchMealsCategories()
        : await fetchDrinksCategories();

      setCategories(recipeCategories.slice(0, MAX_CATEGORIES_QUANTITY));
    };

    requestCategories();
  }, [pathname]);

  return (
    <section className="categories-card-container">
      <CategoryCard
        activeFilter={ activeFilter }
        setActiveFilter={ setActiveFilter }
        handleFilter={ handleAllCategoryFilter }
      />
      {
        categories.map(({ strCategory }) => (
          <CategoryCard
            key={ strCategory }
            activeFilter={ activeFilter }
            setActiveFilter={ setActiveFilter }
            categoryName={ strCategory }
            handleFilter={ handleCategoryFilter }
          />
        ))
      }
    </section>
  );
}

Categories.propTypes = {
  fetchMealsByCategory: PropTypes.func.isRequired,
  fetchDrinksByCategory: PropTypes.func.isRequired,
  fetchAllMeals: PropTypes.func.isRequired,
  fetchAllDrinks: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  fetchMealsByCategory: (catName) => dispatch(requestMealsByCategory(catName)),
  fetchDrinksByCategory: (catName) => dispatch(requestDrinksByCategory(catName)),
  fetchAllMeals: () => dispatch(requestMeals),
  fetchAllDrinks: () => dispatch(requestDrinks),
});

export default connect(null, mapDispatchToProps)(Categories);
