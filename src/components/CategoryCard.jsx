import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  requestDrinks,
  requestDrinksByCategory,
  requestMeals,
  requestMealsByCategory,
} from '../redux/actions';

function CategoryCard(props) {
  const {
    categoryName,
    activeFilter,
    setActiveFilter,
    fetchMealsByCategory,
    fetchDrinksByCategory,
    fetchAllMeals,
    fetchAllDrinks,
  } = props;
  const { location: { pathname } } = useHistory();

  const handleCategoryFilter = (fetchMeals, fetchDrinks) => {
    if (pathname === '/meals') {
      fetchMeals(categoryName);
    } else {
      fetchDrinks(categoryName);
    }
  };

  const handleFilter = () => {
    if (categoryName === 'All' || activeFilter === categoryName) {
      handleCategoryFilter(fetchAllMeals, fetchAllDrinks);
      setActiveFilter('All');
    } else {
      handleCategoryFilter(fetchMealsByCategory, fetchDrinksByCategory);
      setActiveFilter(categoryName);
    }
  };

  return (
    <button
      type="button"
      data-testid={ `${categoryName}-category-filter` }
      onClick={ handleFilter }
    >
      { categoryName }
    </button>
  );
}

CategoryCard.propTypes = {
  categoryName: PropTypes.string,
  activeFilter: PropTypes.string.isRequired,
  setActiveFilter: PropTypes.func.isRequired,
  fetchMealsByCategory: PropTypes.func.isRequired,
  fetchDrinksByCategory: PropTypes.func.isRequired,
  fetchAllMeals: PropTypes.func.isRequired,
  fetchAllDrinks: PropTypes.func.isRequired,
};

CategoryCard.defaultProps = {
  categoryName: 'All',
};

const mapDispatchToProps = (dispatch) => ({
  fetchMealsByCategory: (catName) => dispatch(requestMealsByCategory(catName)),
  fetchDrinksByCategory: (catName) => dispatch(requestDrinksByCategory(catName)),
  fetchAllMeals: () => dispatch(requestMeals),
  fetchAllDrinks: () => dispatch(requestDrinks),
});

export default connect(null, mapDispatchToProps)(CategoryCard);
