import * as Types from './../constants/ActionTypes';
import { callApi, callApiAsync } from './../utils/apiCaller';
import * as Config from './../constants/Config';

export const actFetchProductsRequest = () => {
  return dispatch => {
    return callApi('posts', 'GET', null).then(res => {
      console.log(res);
      dispatch(actFetchProducts(res.data));
    });
  };
};

export const actFetchProducts = products => {
  return {
    type: Types.FETCH_PRODUCTS,
    products,
  };
};

export const actDeleteProductRequest = id => {
  return dispatch => {
    return callApi(`products/${id}`, 'DELETE', null).then(() => {
      dispatch(actDeleteProduct(id));
    });
  };
};

export const actDeleteProduct = id => {
  return {
    type: Types.DELETE_PRODUCT,
    id,
  };
};

export const actAddProductRequest = product => {
  return async dispatch => {
    // return callApi('posts', 'POST', product).then(res => {
    //   console.log(res)
    //   dispatch(actAddProduct(res.data));
    //   return res;
    // });
    // console.log('EEEE')
    // const res = await callApiAsync('posts', 'POST', product);
    const res = await axios({
      method: 'POST',
      url: `${Config.API_URL}/${product}`,
      data: body,
    });

    if (res) {
      dispatch(actAddProduct(res.data));
      // return await Promise.resolve(1);
    }
  };
};

export const actAddProduct = product => {
  return {
    type: Types.ADD_PRODUCT,
    product,
  };
};

export const actGetProductRequest = id => {
  return dispatch => {
    return callApi(`products/${id}`, 'GET', null).then(res => {
      dispatch(actGetProduct(res.data));
    });
  };
};

export const actGetProduct = product => {
  return {
    type: Types.EDIT_PRODUCT,
    product,
  };
};

export const actUpdateProductRequest = product => {
  return dispatch => {
    return callApi(`products/${product.id}`, 'PUT', product).then(res => {
      dispatch(actUpdateProduct(res.data));
    });
  };
};

export const actUpdateProduct = product => {
  return {
    type: Types.UPDATE_PRODUCT,
    product,
  };
};
