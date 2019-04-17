import React, { Component } from 'react';
import '../styles/product.css';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addToCart } from '../actions/cartActions';


class Product extends Component {

  state = {
    quantity : 1
  }

  addProductToCart(){
    for(let i = 0, iMax = this.state.quantity; i < iMax; i++) {
      localStorage.setItem(
        'cart',
        JSON.stringify([...this.props.cart, this.props.info])
      );
      this.props.addToCart(this.props.info);
    }
  }

  moreQuantity(){
    this.setState({
      quantity: this.state.quantity + 1
    })
  }

  lessQuantity(){
    this.setState({
      quantity: this.state.quantity - 1
    })
  }

  render () {
    const {name, photoUrl, alt, description, price, stock} = this.props.info;
    return (
      <li className="list-group-item col-md-4 col-sm-6 col-12">
        <img src={photoUrl} alt={alt} className="img-fluid"/>
        <div className="data-content">
          <h3 className="text-dark m-0">
            {name}
          </h3>
          <p className="text-dark m-0">
            {description}
          </p>
          <p className="text-dark m-0 product-price">
            Only for {price}€
          </p>
        </div>
        {stock ?
          <div className="col-md-12 col-sm-12 col-12 cart-selector">
            <div className="col">
              <button className="add-to-cart"
                      onClick={this.addProductToCart.bind(this)}>
                Add to cart
              </button>
            </div>
            <div className="col text-center">
              <button className="lessMoreQuantity"
                      onClick={this.state.quantity > 1 ? this.lessQuantity.bind(this) : null}>
                -
              </button>
              <span className="text-dark">
              {this.state.quantity}
            </span>
              <button className="lessMoreQuantity"
                      onClick={this.state.quantity < stock ? this.moreQuantity.bind(this) : null}>
                +
              </button>
            </div>
          </div>
          :
          <p className="text-dark">Out of stock</p>}
      </li>
    );
  }
}

Product.propTypes = {
  addToCart: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
  cart: state.cart.cart
});

export default connect(mapStateToProps, {addToCart})(Product);