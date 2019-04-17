import React, { Component } from 'react';
import Product from "./Product";
import '../styles/productsList.css';
import { connect } from 'react-redux';
import { getProducts } from '../actions/productsActions';

class ProductsList extends Component {

  componentDidMount() {
    this.props.getProducts();
  }

  render () {
    const {products} = this.props;
    return (
      <React.Fragment>
        <h1 className="text-center my-3">Enjoy our products!</h1>
        <div className="row justify-content-center">
          <div className="col-md-12">
            <ul className="row justify-content-between align-items-center products-list">
              {products.map(product => (
                <Product
                  key={product.id}
                  info={product}
                />
              ))}
            </ul>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  products: state.products.products
})
export default connect(mapStateToProps, { getProducts })(ProductsList);