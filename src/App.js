import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { useState } from "react";
import "./App.css";
import "react-table/react-table.css";
import 'react-toastify/dist/ReactToastify.css';
import Login from './Login';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import CarList from './CarList';

const App = () => {
  const [isAuthenticated, setAuthenticated] = useState(false);
  const SecuredRoute = ({component: Component, isAuthenticated, ...rest}) => (
    <Route {...rest} render={ props => ( 
      isAuthenticated 
      ? <Component {...props} /> 
      : <Redirect to={{pathname:'/login', state:{from: props.location}}} />
    )} />
  );
 
  return (
    <div className="App">
      <AppBar position="static" color="default">
        <Toolbar>
          <Typography variant="h6" color="inherit">
            Cars List
          </Typography>
        </Toolbar>
      </AppBar>
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            {isAuthenticated ? <Redirect to="/cars" /> : <Redirect to="/login" />}
          </Route>
          <Route path="/login">
            <Login isAuthenticated={isAuthenticated} setAuthenticated={setAuthenticated} />
          </Route>
          <Route path="/contact" render={() => <h1>Contact</h1>} />
          <SecuredRoute isAuthenticated={isAuthenticated} 
            path="/cars" component={CarList} />

          <Route render={() => <h1>Page not found</h1>} />
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default App;
