import React from 'react';
import { Card, CardContent, CardMedia, Typography } from '@mui/material';

const Item = ({ item }) => {
  return (
    <Card sx={{ maxWidth: 345, m: 2 }}>
      <CardMedia
        component="img"
        height="140"
        image={item.image_url}
        alt={item.name}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {item.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {item.description}
        </Typography>
        <Typography variant="h6" color="text.primary">
          ${item.price}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default Item;