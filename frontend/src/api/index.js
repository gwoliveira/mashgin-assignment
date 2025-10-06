import axios from 'axios';

export const getCategories = () => {
  return axios.get('/categories');
};

export const getItems = (categoryId) => {
  const params = categoryId ? { category_id: categoryId } : {};
  return axios.get('/items', { params });
};

export const createOrder = (order) => {
  return axios.post('/orders', order);
};
