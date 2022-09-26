import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { fetchMealsCategories } from '../services/mealsApi';
import { fetchDrinksCategories } from '../services/drinksApi';
import { MAX_CATEGORIES_QUANTITY } from '../utils/constants';
import CategoryCard from './CategoryCard';

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [activeFilter, setActiveFilter] = useState('All');
  const { location: { pathname } } = useHistory();

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
      />
      {
        categories.map(({ strCategory }) => (
          <CategoryCard
            key={ strCategory }
            activeFilter={ activeFilter }
            setActiveFilter={ setActiveFilter }
            categoryName={ strCategory }
          />
        ))
      }
    </section>
  );
}
