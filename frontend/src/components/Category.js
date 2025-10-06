import React from 'react';
import { Button, Box } from '@mui/material';

const Category = ({ categories, handleCategoryClick }) => {
  return (
    <Box sx={{ mb: 2 }}>
      <h2>Categories</h2>
      <Button variant="contained" onClick={() => handleCategoryClick(null)}>All</Button>
      {categories.map(category => (
        <Button key={category.id} variant="outlined" onClick={() => handleCategoryClick(category.id)} sx={{ ml: 1 }}>
          <img src={category.image_url} alt={category.name} width="50" style={{ marginRight: '8px' }} />
          {category.name}
        </Button>
      ))}
    </Box>
  );
};

export default Category;