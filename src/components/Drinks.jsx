import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import RecipeCard from './RecipeCard';

function Drinks({ drinks }) {
  return (
    <section className="drinks-section">
      <section className="drinks-cards-section">
        {
          drinks.map(({ idDrink, strDrink, strDrinkThumb }, index) => (
            <RecipeCard
              key={ idDrink }
              index={ index }
              linkTo={ `/drinks/${idDrink}` }
              recipeName={ strDrink }
              recipeImage={ strDrinkThumb }
            />
          ))
        }
      </section>
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
