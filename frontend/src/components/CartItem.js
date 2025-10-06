import React, { useContext } from 'react';
import {
  ListItem,
  ListItemText,
  IconButton,
  Typography,
} from '@mui/material';
import { AddCircleOutline, RemoveCircleOutline } from '@mui/icons-material';
import { CartContext } from '../context/CartContext';

const CartItem = ({ item }) => {
  const { addToCart, removeFromCart } = useContext(CartContext);

  return (
    <ListItem disablePadding>
      <ListItemText
        primary={item.name}
        secondary={`$${item.price.toFixed(2)}`}
      />
      <IconButton onClick={() => removeFromCart(item.id)} size="small">
        <RemoveCircleOutline />
      </IconButton>
      <Typography sx={{ mx: 1 }}>{item.quantity}</Typography>
      <IconButton onClick={() => addToCart(item)} size="small">
        <AddCircleOutline />
      </IconButton>
    </ListItem>
  );
};

export default CartItem;
