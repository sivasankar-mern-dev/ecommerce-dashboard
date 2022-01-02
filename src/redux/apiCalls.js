import { loginFailure, loginStart, loginSuccess } from "./userRedux";
import { getProductSuccess, getProductFailure, getProductStart, deleteProductStart, deleteProductSuccess, deleteProductFailure, updateProductStart, updateProductSuccess, updateProductFailure, addProductStart, addProductSuccess, addProductFailure } from "./productRedux";
import { getUsersStart, getUsersSuccess, getUsersFailure } from "./usersRedux";
import { getOrdersStart, getOrdersSuccess, getOrdersFailure } from "./ordersRedux";
import { userRequest, publicRequest } from "../requestMethods";

export const login = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const res = await userRequest.post('/auth/login', user);
    dispatch(loginSuccess(res.data))
  } catch (err) {
    dispatch(loginFailure())
  }
};

export const getProducts = async (dispatch) => {
  dispatch(getProductStart());
  try {
    const res = await publicRequest.get('/products');
    dispatch(getProductSuccess(res.data))
  } catch (err) {
    dispatch(getProductFailure());
  }
};

export const deleteProduct = async (id, dispatch) => {
  dispatch(deleteProductStart());
  try {
    // const res = await userRequest.delete(`/products/${id}`); product to remove from db
    dispatch(deleteProductSuccess(id))
  } catch (err) {
    dispatch(deleteProductFailure());
  }
};

export const updateProduct = async (id, product) => {
  const res = await userRequest.put(`/products/${id}`, product);
};

export const addProduct = async (product, dispatch) => {
  dispatch(addProductStart());
  try {
    const res = await userRequest.post('/products', product)
    dispatch(addProductSuccess(res.data))
  } catch (err) {
    dispatch(addProductFailure());
  }
};

export const getUsers = async (dispatch) => {
  dispatch(getUsersStart());
  try {
    const res = await userRequest.get('users');
    dispatch(getUsersSuccess(res.data));
  } catch (err) {
    dispatch(getUsersFailure());
  }
}

export const getAllOrders = async (dispatch) => {
  dispatch(getOrdersStart());
  try {
    const res = await userRequest.get('orders');
    dispatch(getOrdersSuccess(res.data));
  } catch (err) {
    dispatch(getOrdersFailure());
  }
}