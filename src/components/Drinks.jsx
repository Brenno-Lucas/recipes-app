import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import RecipeCard from './RecipeCard';

function Drinks({ drinks }) {
  return (
    <section className="drink-cards-section">
      {
        drinks.map(({ idDrink, strDrink, strDrinkThumb }, index) => (
          <Link
            key={ idDrink }
            to={ `/drinks/${idDrink}` }
          >
            <RecipeCard
              key={ idDrink }
              index={ index }
              recipeName={ strDrink }
              recipeImage={ strDrinkThumb }
            />
          </Link>
        ))
      }
    </section>
  );
}

Drinks.propTypes = {
  drinks: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

const mapStateToProps = ({ drinkReducer }) => ({
  drinks: drinkReducer.drinks,
});

export default connect(mapStateToProps)(Drinks);
