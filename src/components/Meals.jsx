import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import RecipeCard from './RecipeCard';

function Meals({ meals }) {
  return (
    <section className="meals-cards-section">
      {
        meals.map(({ idMeal, strMeal, strMealThumb }, index) => (
          <RecipeCard
            key={ idMeal }
            index={ index }
            recipeName={ strMeal }
            recipeImage={ strMealThumb }
          />
        ))
      }
    </section>
  );
}

Meals.propTypes = {
  meals: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

const mapStateToProps = ({ mealReducer }) => ({
  meals: mealReducer.meals,
});

export default connect(mapStateToProps)(Meals);