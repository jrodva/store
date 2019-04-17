import React, { Component } from 'react';
import '../styles/cart.css';
import { connect } from 'react-redux';
import { getCart } from '../actions/cartActions';
import { getOffers } from '../actions/offersActions';
import store from '../store';
import ProductCart from "./ProductCart";
import Checkout from "../helpers/Checkout";
import { getProducts } from "../actions/productsActions";

store.subscribe(()=>{
  localStorage.setItem('cart', JSON.stringify(store.getState()))
}, ['cart']);

class Cart extends Component {

  state = {
    successfulPurchase: false
  }

  componentDidMount () {
    this.props.getProducts();
    this.props.getOffers();
    this.props.getCart();
  }

  buyProducts() {
    this.setState({
      successfulPurchase: true
    });
  }

  render () {
    const {cart, offers, products} = this.props;
    const {successfulPurchase} = this.state;
    let cartWithQuantity = [...new Set(cart.map(({id}) => id))].map(e => cart.find(({id}) => id === e));
    for(let i = 0, iMax = cartWithQuantity.length; i < iMax; i++){
      cartWithQuantity[i]['quantity'] = 0;
      for(let j = 0, jMax = cart.length; j < jMax; j++){
        if (cartWithQuantity[i].id === cart[j].id) {
          cartWithQuantity[i]['quantity'] += 1;
        }
      }
    }

    let totalPrice = 0;
    let co = new Checkout(offers, products);
    for(let k = 0, kMax = cart.length; k < kMax; k++){
      co.scan(cart[k].code)
    }
    totalPrice = co.total();

    return (
      <React.Fragment>
      {
       !successfulPurchase && (
        <React.Fragment>
          <h1 className="text-center my-3">Cart</h1>
          <div className="container-fluid">
            {cartWithQuantity.map(product => (
              <ProductCart
                key={product.id}
                info={product}
              />
            ))}
          </div>
          <div className="container-fluid summary">
            <div className="row">
              <div className="col">
                <button disabled={!cart.length}
                        onClick={this.buyProducts.bind(this)}
                        className="buy-button">Buy products</button>
              </div>
              <div className="col">
                <p>Total Price: {totalPrice}</p>
              </div>
            </div>
          </div>
        </React.Fragment>
        )
      }
      {
        successfulPurchase && (
        <React.Fragment>
          <h1 className="text-center">
            Successful purchase !
          </h1>
          <h3 className="text-center">
            Thank you very much for your purchase
          </h3>
          <p className="text-center">We want to give you a present</p>
          <img className="present-image"
               src="https://goofy-shannon-8fec5b.netlify.com/bottles.jpg"
               width="469"
               height="349"
               alt="Eco bottles" />
        </React.Fragment>
        )
      }
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  cart: state.cart.cart,
  products: state.products.products,
  offers: state.offers.offers
});
export default connect(mapStateToProps, { getOffers, getCart, getProducts })(Cart);