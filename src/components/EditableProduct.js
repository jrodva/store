import React, {Component} from "react";
import '../styles/editableProduct.css';
import { connect } from 'react-redux';
import { deleteProduct } from '../actions/productsActions';
import {Link} from "react-router-dom";

class EditableProduct extends Component {

  deleteProduct = () => {
    const {id} = this.props.info;
    this.props.deleteProduct(id);
  }

  render() {
    const {photoUrl, alt, id, name} = this.props.info;
    return (
      <div className="row align-items-center product-admin-item">
        <div className="col">
          <img src={photoUrl}
               alt={alt}
               className="img-fluid editable-product-image"/>
          <span className="text-dark">
            {name}
          </span>
        </div>
        <div className="col text-dark">
          <button onClick={this.deleteProduct}
                  type="button"
                  className="btn remove-button">
            Delete product
          </button>
        </div>
        <div className="col">
          <Link to={`/admin/products/edit/${id}`}
                className="btn edit-button">
            Edit product
          </Link>
        </div>
      </div>
    )
  }
}

export default connect(null, {deleteProduct})(EditableProduct);