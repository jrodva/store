import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../styles/header.css';
import cartImg from "../cart.svg";
import { connect } from 'react-redux';
import { getCart } from '../actions/cartActions';
import cabifyLogo from "../logo.svg";
import store from '../store';

store.subscribe(()=>{
  localStorage.setItem('cart', JSON.stringify(store.getState()))
}, ['cart']);

class Header extends Component {

  componentDidMount () {
    this.props.getCart();
  }

  render() {
    let {cart} = this.props;
    return (
      <nav className="navbar cabi-header">
        <div>
          <Link to={'/'}>
            <img src={cabifyLogo} width="115" alt="cart" height="45"/>
          </Link>
        </div>
        <div className="cart-data">
          <React.Fragment>
            <div className="text-center counter-cart">
              {cart.length}
            </div>
            <Link to={'/cart'}>
              <img src={cartImg} width="30" alt="cart" height="30"/>
            </Link>
          </React.Fragment>
        </div>
      </nav>
    );
  }
}

const mapStateToProps = (state) => ({
  cart: state.cart.cart
});
export default connect(mapStateToProps, { getCart })(Header);