import React, { Component } from 'react';
import '../styles/productsAdmin.css';
import {connect} from "react-redux";
import {getProducts} from "../actions/productsActions";
import EditableProduct from "./EditableProduct";
import {Link} from "react-router-dom";

class ProductsAdmin extends Component {

  componentDidMount () {
    this.props.getProducts();
  }

  login() {
    this.props.auth.login();
  }

  render () {
    const {isAuthenticated} = this.props.auth;
    const {products} = this.props;
    return (
      <React.Fragment>
        <h1 className="text-center my-3">Products Admin</h1>
        { isAuthenticated() && (
          <React.Fragment>
            <div className="container-fluid">
              <div className="row align-items-center product-admin-item">
                <div className="col">
                  Click on Add product to create a new product
                </div>
                <div className="col">
                  <Link to={'/admin/products/new'}
                        className="btn add-button">
                    Add product
                  </Link>
                </div>
              </div>
            </div>
            <div className="container-fluid">
              {products.map(product => (
                <EditableProduct
                  key={product.id}
                  info={product}
                />
              ))}
            </div>
          </React.Fragment>)
        }
        {
          !isAuthenticated() && (
            <div className="col">
              <h4 className="not-logged-advice">
                You are not logged in! Please{' '}
                <div className="col-5 text-center login-button"
                     onClick={this.login.bind(this)}>
                  Log In
                </div>
                {' '}to continue.
              </h4>
            </div>
          )
        }
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  products: state.products.products
})

export default connect(mapStateToProps, { getProducts })(ProductsAdmin);