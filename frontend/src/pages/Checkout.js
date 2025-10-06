import React, { useContext } from 'react';
import {
  Box,
  Typography,
  Paper,
  List,
  Button,
  Divider,
  TextField,
  Grid,
} from '@mui/material';
import { CartContext } from '../context/CartContext';
import CartItem from '../components/CartItem';
import { useNavigate, Link } from 'react-router-dom';

const Checkout = () => {
  const { cartItems, getCartTotal, clearCart } = useContext(CartContext);
  const navigate = useNavigate();

  const handlePurchase = () => {
    alert('Purchase successful!');
    clearCart();
    navigate('/');
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Checkout
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 2 }}>
            <Typography variant="h6" component="h2" gutterBottom>
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
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    mb: 2,
                  }}
                >
                  <Typography variant="h6">Total:</Typography>
                  <Typography variant="h6">
                    ${getCartTotal().toFixed(2)}
                  </Typography>
                </Box>
              </>
            )}
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 2 }}>
            <Typography variant="h6" component="h2" gutterBottom>
              Payment Information
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <TextField
              label="Card Number"
              variant="outlined"
              fullWidth
              sx={{ mb: 2 }}
            />
            <TextField
              label="Card Holder"
              variant="outlined"
              fullWidth
              sx={{ mb: 2 }}
            />
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  label="Expiry Date"
                  variant="outlined"
                  fullWidth
                  sx={{ mb: 2 }}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="CVV"
                  variant="outlined"
                  fullWidth
                  sx={{ mb: 2 }}
                />
              </Grid>
            </Grid>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={handlePurchase}
                disabled={cartItems.length === 0}
              >
                Purchase
              </Button>
              <Link to="/" style={{ textDecoration: 'none', width: '100%' }}>
                <Button variant="contained" color="secondary" fullWidth>
                  Continue Shopping
                </Button>
              </Link>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Checkout;
