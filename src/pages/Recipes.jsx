import { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { requestMeals, requestDrinks } from '../redux/actions';
import Header from '../components/Header';
import Meals from '../components/Meals';
import Drinks from '../components/Drinks';
import Categories from '../components/Categories';
import Footer from '../components/Footer';

function Recipes({ fetchMeals, fetchDrinks }) {
  useEffect(() => {
    fetchMeals();
    fetchDrinks();
  }, [fetchMeals, fetchDrinks]);

  const { location: { pathname } } = useHistory();

  const renderRecipe = () => {
    if (pathname.includes('meals')) return <Meals />;
    return <Drinks />;
  };

  return (
    <div>
      <Header />
      <section className="recipes-section">
        <Categories />
        {
          renderRecipe()
        }
      </section>
      <Footer />
    </div>
  );
}

Recipes.propTypes = {
  fetchMeals: PropTypes.func.isRequired,
  fetchDrinks: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  fetchMeals: () => dispatch(requestMeals),
  fetchDrinks: () => dispatch(requestDrinks),
});

export default connect(null, mapDispatchToProps)(Recipes);
