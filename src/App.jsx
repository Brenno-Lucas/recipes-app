import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './styles/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './pages/Login';
import Recipes from './pages/Recipes';

function App() {
  return (
    <main>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/meals" component={ Recipes } />
        <Route exact path="/drinks" component={ Recipes } />
        {/* <Route exact path="/meals/:meal-id" component={  } /> */}
        {/* <Route exact path="/drinks/:drink-id" component={  } /> */}
        {/* <Route exact path="/meals/:meal-id/in-progress" component={  } /> */}
        {/* <Route exact path="/drinks/:drink-id/in-progress" component={  } /> */}
        {/* <Route exact path="/profile" component={  } /> */}
        {/* <Route exact path="/done-recipes" component={  } /> */}
        {/* <Route exact path="/favorite-recipes" component={  } /> */}
        {/* <Route exact path="/not-found" component={  } /> */}
      </Switch>
    </main>
  );
}

export default App;
