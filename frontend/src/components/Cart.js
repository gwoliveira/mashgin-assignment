import React, { useContext } from 'react';
import {
  Box,
  Typography,
  Paper,
  List,
  Button,
  Divider,
} from '@mui/material';
import { CartContext } from '../context/CartContext';
import CartItem from './CartItem';

const Cart = () => {
  const { cartItems, clearCart, getCartTotal } = useContext(CartContext);

  return (
    <Paper
      elevation={3}
      sx={{
        p: 2,
        position: 'fixed',
        top: 20,
        right: 20,
        width: '300px',
        height: 'calc(100vh - 40px)',
        overflowY: 'auto',
      }}
    >
      <Typography variant="h5" component="h3" gutterBottom>
        Your Order
      </Typography>
      <Divider sx={{ mb: 2 }} />
      {cartItems.length === 0 ? (
        <Typography variant="body1">Your cart is empty.</Typography>
      ) : (
        <>
          <List>
            {cartItems.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}
          </List>
          <Divider sx={{ my: 2 }} />
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
            <Typography variant="h6">Total:</Typography>
            <Typography variant="h6">${getCartTotal().toFixed(2)}</Typography>
          </Box>
          <Button
            variant="contained"
            color="secondary"
            fullWidth
            onClick={clearCart}
          >
            Clear Cart
          </Button>
        </>
      )}
    </Paper>
  );
};

export default Cart;
