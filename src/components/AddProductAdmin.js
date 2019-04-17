import React, { Component } from 'react';
import '../styles/addProductAdmin.css';
import {connect} from 'react-redux';
import { addProduct } from '../actions/productsActions';
import uuid from 'uuid';

class AddProductAdmin extends Component {

  state = {
    id: '',
    code: '',
    name: '',
    photoUrl: '',
    alt: '',
    description: '',
    price: '',
    stock: 0,
    error: false
  }

  codeProduct = e => {
    this.setState({code: e.target.value })
  }

  nameProduct = e => {
    this.setState({name: e.target.value })
  }

  photoUrlProduct = e => {
    this.setState({photoUrl: e.target.value })
  }

  altProduct = e => {
    this.setState({alt: e.target.value })
  }

  descriptionProduct = e => {
    this.setState({description: e.target.value })
  }

  priceProduct = e => {
    this.setState({price: e.target.value })
  }

  stockProduct = e => {
    this.setState({stock: e.target.value })
  }

  newProduct = e => {
    e.preventDefault();

    const { code,
            name,
            photoUrl,
            alt,
            description,
            price,
            stock} = this.state;

    if(code === ''
       || name === ''
       || photoUrl === ''
       || alt === ''
       || description === ''
       || price === ''
       || stock === 0) {
      this.setState({error: true});
      return;
    }
    this.setState({error: false});
    const id = uuid();
    const infoProduct = {id,
                         code,
                         name,
                         photoUrl,
                         alt,
                         description,
                         price,
                         stock};
    this.props.addProduct(infoProduct);
    this.props.history.push('/admin/products');
  }

  login() {
    this.props.auth.login();
  }

  render () {
    const {isAuthenticated} = this.props.auth;
    const {error} = this.state;
    return (
      <React.Fragment>
        <h1 className="text-center my-3">
          Add Products Admin
        </h1>
        { isAuthenticated() && (
          <div className="container-fluid">
            <div className="row align-items-center">
              <div className="col">
                <form onSubmit={this.newProduct}>

                  <div className="form-group">
                    <label>Code</label>
                    <input onChange={this.codeProduct}
                           type="text"
                           className="form-control"
                           placeholder="code" />
                  </div>

                  <div className="form-group">
                    <label>Name</label>
                    <input onChange={this.nameProduct}
                           type="text"
                           className="form-control"
                           placeholder="name" />
                  </div>

                  <div className="form-group">
                    <label>Photo url</label>
                    <input onChange={this.photoUrlProduct}
                           type="text"
                           className="form-control"
                           placeholder="url" />
                  </div>

                  <div className="form-group">
                    <label>Photo alt</label>
                    <input onChange={this.altProduct}
                           type="text"
                           className="form-control"
                           placeholder="alt" />
                  </div>

                  <div className="form-group">
                    <label>Description</label>
                    <input onChange={this.descriptionProduct}
                           type="text"
                           className="form-control"
                           placeholder="description" />
                  </div>

                  <div className="form-group">
                    <label>Price</label>
                    <input onChange={this.priceProduct}
                           type="text"
                           className="form-control"
                           placeholder="price" />
                  </div>

                  <div className="form-group">
                    <label>Stock</label>
                    <input onChange={this.stockProduct}
                           type="text"
                           className="form-control"
                           placeholder="stock" />
                  </div>

                  <button type="submit"
                          className="font-weight-bold text-uppercase d-block w-100 add-product-admin-button">
                    Add
                  </button>
                </form>
                {error ?
                  <div className="font-weight-bold alert alert-danger text-center mt-4 ">
                    All fields are mandatory
                  </div>
                  : ''
                }
              </div>
            </div>
          </div>
        )}
        {
          !isAuthenticated() && (
            <div className="col text-center">
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

export default connect(null, {addProduct})(AddProductAdmin);