import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setType } from '../redux/actions';

function SimpleFilter({ setFilterType }) {
  useEffect(() => {
    setFilterType('all');
  }, [setFilterType]);

  const handleClick = ({ target }) => {
    const { value } = target;
    console.log(value);
    setFilterType(value);
  };

  return (
    <section>
      <button
        type="button"
        value="all"
        data-testid="filter-by-all-btn"
        onClick={ handleClick }
      >
        All
      </button>
      <button
        type="button"
        value="meals"
        data-testid="filter-by-meal-btn"
        onClick={ handleClick }
      >
        Meals
      </button>
      <button
        type="button"
        value="drinks"
        data-testid="filter-by-drink-btn"
        onClick={ handleClick }
      >
        Drinks
      </button>
    </section>
  );
}

SimpleFilter.propTypes = {
  setFilterType: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  setFilterType: (type) => dispatch(setType(type)),
});

export default connect(null, mapDispatchToProps)(SimpleFilter);
