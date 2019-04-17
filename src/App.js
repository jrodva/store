import React, { Component } from 'react';
import './app.css';
import Header from "./components/Header";
import ProductsList from "./components/ProductsList"
import Admin from "./components/Admin"
import Cart from "./components/Cart";
import { Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import ProductsAdmin from "./components/ProductsAdmin";
import AddProductAdmin from "./components/AddProductAdmin";
import EditProductAdmin from "./components/EditProductAdmin";
import Auth from "./Auth/Auth";
import history from './history';
import Callback from "./components/Callback/Callback";

const auth = new Auth();

const handleAuthentication = (nextState, replace) => {
  if (/access_token|id_token|error/.test(nextState.location.hash)) {
    auth.handleAuthentication();
  }
}

class App extends Component {

  render() {
    return (
      <Provider store={store}>
        <Router history={history}>
          <React.Fragment>
            <Header auth={auth} />
            <div className="container general-wrapper">
              <Route exact path="/" component={ProductsList} />
              <Route exact path="/cart" component={Cart} />
              <Route exact path="/admin" render={(props) => <Admin auth={auth} {...props} />} />
              <Route exact path="/admin/products" render={(props) => <ProductsAdmin auth={auth} {...props} />} />
              <Route exact path="/admin/products/new" render={(props) => <AddProductAdmin auth={auth} {...props} />} />
              <Route exact path="/admin/products/edit/:id" render={(props) => <EditProductAdmin auth={auth} {...props} />} />
              <Route path="/callback" render={(props) => { handleAuthentication(props); return <Callback {...props} />}}/>
            </div>
          </React.Fragment>
        </Router>
      </Provider>

    );
  }
}

export default App;
