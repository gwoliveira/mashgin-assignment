import React, { useState, useEffect } from 'react';
import { getCategories, getItems } from '../api';
import Item from '../components/Item';
import Category from '../components/Category';
import Cart from '../components/Cart';
import { Grid, Box } from '@mui/material';

const Menu = () => {
  const [categories, setCategories] = useState([]);
  const [items, setItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    getCategories()
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.error('Error fetching categories:', error);
      });

    getItems()
      .then((response) => {
        setItems(response.data);
      })
      .catch((error) => {
        console.error('Error fetching items:', error);
      });
  }, []);

  const handleCategoryClick = (categoryId) => {
    setSelectedCategory(categoryId);
    getItems(categoryId)
      .then((response) => {
        setItems(response.data);
      })
      .catch((error) => {
        console.error('Error fetching items for category:', error);
      });
  };

  const filteredItems = selectedCategory
    ? items.filter((item) => item.category_id === selectedCategory)
    : items;

  return (
    <Box sx={{ display: 'flex' }}>
      <Box sx={{ flexGrow: 1 }}>
        <Category
          categories={categories}
          handleCategoryClick={handleCategoryClick}
          sx={{ mt: 4 }}
        />
        <Grid container spacing={2}>
          {filteredItems.map((item) => (
            <Grid item xs={12} sm={6} md={4} key={item.id}>
              <Item item={item} />
            </Grid>
          ))}
        </Grid>
      </Box>
      <Box sx={{ width: '300px', ml: 4 }}>
        <Cart />
      </Box>
    </Box>
  );
};

export default Menu;