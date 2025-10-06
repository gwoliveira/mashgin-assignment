import React from 'react';
import { ToggleButton, ToggleButtonGroup, Typography, Box } from '@mui/material';

const Category = ({ categories, selectedCategory, handleCategoryClick, sx }) => {
  const handleChange = (event, newCategory) => {
    handleCategoryClick(newCategory);
  };

  return (
    <Box sx={{ mb: 4, textAlign: 'center', ...sx }}>
      <Typography variant="h4" component="h2" gutterBottom sx={{ fontWeight: 'bold', color: '#333' }}>
        Our Menu
      </Typography>
      <ToggleButtonGroup
        value={selectedCategory}
        exclusive
        onChange={handleChange}
        aria-label="category selection"
        sx={{ justifyContent: 'center' }}
      >
        <ToggleButton value={null} aria-label="all categories">
          All
        </ToggleButton>
        {categories.map(category => (
          <ToggleButton key={category.id} value={category.id} aria-label={category.name}>
            {category.name}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
    </Box>
  );
};

export default Category;
