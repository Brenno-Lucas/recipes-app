import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import RecipeCard from './RecipeCard';
import Footer from './Footer';

function Drinks({ drinks }) {
  return (
    <>
      <section className="drink-cards-section">
        {
          drinks.map(({ idDrink, strDrink, strDrinkThumb }, index) => (
            <RecipeCard
              key={ idDrink }
              index={ index }
              recipeName={ strDrink }
              recipeImage={ strDrinkThumb }
            />
          ))
        }
      </section>
      <Footer />
    </>
  );
}

Drinks.propTypes = {
  drinks: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

const mapStateToProps = ({ drinkReducer }) => ({
  drinks: drinkReducer.drinks,
});

export default connect(mapStateToProps)(Drinks);
