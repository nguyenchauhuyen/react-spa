import React, { useState, useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { actAddProductRequest, actGetProductRequest, actUpdateProductRequest } from './../../actions/index';

const ProductActionPage = () => {
  const { itemEditing } = useSelector(state => ({
    itemEditing: state.itemEditing,
  }));

  console.log(itemEditing);

  const dispatch = useDispatch();
  const { id } = useParams();
  const history = useHistory();
  const [values, setValues] = useState({});

  useEffect(() => {
    if (id) {
      dispatch(actGetProductRequest(id));
    }
  }, []);

  useEffect(() => {
    const newValues = {
      id: itemEditing.id,
      name: itemEditing.name,
      price: itemEditing.price,
      status: itemEditing.status,
    };
    setValues(newValues);
  }, [itemEditing]);

  const onChange = e => {
    var target = e.target;
    var name = target.name;
    var value = target.type === 'checkbox' ? target.checked : target.value;
    setValues(values => ({ ...values, [name]: value }));
  };

  const onSave = e => {
    e.preventDefault();
    const { id, name, price, status } = values;
    const product = {
      id,
      name,
      price,
      status,
    };
    if (id) {
      dispatch(actUpdateProductRequest(product));
    } else {
      dispatch(actAddProductRequest(id));
    }
    history.goBack();
  };

  return (
    <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
      <form onSubmit={onSave}>
        <div className="form-group">
          <label>Tên Sản Phẩm: </label>
          <input type="text" className="form-control" name="name" value={values.name || ''} onChange={onChange} />
        </div>
        <div className="form-group">
          <label>Giá: </label>
          <input type="number" className="form-control" name="price" value={values.price || ''} onChange={onChange} />
        </div>
        <div className="form-group">
          <label>Trạng Thái: </label>
        </div>
        <div className="checkbox">
          <label>
            <input type="checkbox" name="status" value={values.status} onChange={onChange} checked={values.status} />
            Còn Hàng
          </label>
        </div>
        <Link to="/product-list" className="btn btn-danger mr-10">
          Trở Lại
        </Link>
        <button type="submit" className="btn btn-primary">
          Lưu Lại
        </button>
      </form>
    </div>
  );
};

export default ProductActionPage;
