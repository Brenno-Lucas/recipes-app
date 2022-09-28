import { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { requestMeals, requestDrinks } from '../redux/actions';
import Header from '../components/Header';
import Meals from '../components/Meals';
import Drinks from '../components/Drinks';

function Recipes({ fetchMeals, fetchDrinks }) {
  useEffect(() => {
    fetchMeals();
    fetchDrinks();
  }, [fetchMeals, fetchDrinks]);

  const { location: { pathname } } = useHistory();

  const renderRecipe = () => {
    switch (pathname) {
    case '/meals':
      return <Meals />;
    default:
      return <Drinks />;
    }
  };

  return (
    <div>
      <Header />
      <section className="cards-section">
        {
          renderRecipe()
        }
      </section>
    </div>
  );
}

Recipes.propTypes = {
  fetchMeals: PropTypes.func.isRequired,
  fetchDrinks: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  fetchMeals: () => dispatch(requestMeals()),
  fetchDrinks: () => dispatch(requestDrinks()),
});

export default connect(null, mapDispatchToProps)(Recipes);
