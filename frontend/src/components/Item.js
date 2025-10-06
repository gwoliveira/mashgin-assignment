import React from 'react';
import { Card, CardContent, CardMedia, Typography } from '@mui/material';

const Item = ({ item }) => {
  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', '&:hover': { boxShadow: 6 } }}>
      <CardMedia
        component="img"
        sx={{ height: 140 }}
        image={item.image_url}
        alt={item.name}
      />
      <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <div>
          <Typography gutterBottom variant="h5" component="div">
            {item.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {item.description}
          </Typography>
        </div>
        <Typography variant="h6" color="text.primary" sx={{ mt: 2 }}>
          ${item.price}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default Item;