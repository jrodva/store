import React, { Component } from 'react';
import '../styles/admin.css';
import { Link } from 'react-router-dom';

class Admin extends Component {

  login() {
    this.props.auth.login();
  }

  render () {
    const {isAuthenticated} = this.props.auth;
    return (
      <div className="container text-center my-3">
        <h1>Cabify Store Administration</h1>

        <div className="row text-center admin-options">
          {
            isAuthenticated() && (
              <React.Fragment>
                <div className="col">
                  <Link to={'/admin/products'}
                        className="col-12 admin-option">
                    <h2>Products Administration</h2>
                  </Link>
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
        </div>
      </div>
    );
  }
}

export default Admin;