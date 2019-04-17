import React, { Component } from 'react';
import '../styles/productCart.css';
import { connect } from 'react-redux';
import { deleteFromCart } from '../actions/cartActions';

class ProductCart extends Component {

  deleteProduct = () => {
    const {id} = this.props.info;
    this.props.deleteFromCart(id);
  }

  render() {
    const {name, quantity, price, photoUrl, alt} = this.props.info;
    return (
      <div className="row cart-item">

        <div className="col">
          <img src={photoUrl}
               alt={alt}
               className="img-fluid product-image"/>
        </div>

        <div className="col">
          <div className="col text-dark">
            <p>{name}</p>
            <p>{price}€</p>
          </div>
          <div className="col">
            <span className="text-dark">{quantity}u</span>
            <button onClick={this.deleteProduct}
                    type="button"
                    className="btn remove-button">X</button>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(null, {deleteFromCart})(ProductCart);