import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './styles/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './pages/Login';
import Profile from './pages/Profile';
import DoneRecipes from './pages/DoneRecipes';
import Recipes from './pages/Recipes';
import MealRecipe from './components/MealRecipe';
import DrinkRecipe from './components/DrinkRecipe';
import FavoriteRecipes from './pages/FavoriteRecipes';
import recipesInProgress from './pages/Recipesinprogress';

function App() {
  return (
    <main>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/meals" component={ Recipes } />
        <Route exact path="/drinks" component={ Recipes } />
        <Route exact path="/meals/:id" component={ MealRecipe } />
        <Route exact path="/drinks/:id" component={ DrinkRecipe } />
        <Route exact path="/meals/:id/in-progress" component={ recipesInProgress } />
        <Route exact path="/drinks/:id/in-progress" component={ recipesInProgress } />
        <Route exact path="/profile" component={ Profile } />
        <Route exact path="/done-recipes" component={ DoneRecipes } />
        <Route exact path="/favorite-recipes" component={ FavoriteRecipes } />
        {/* <Route exact path="/not-found" component={  } /> */}
      </Switch>
    </main>
  );
}

export default App;
