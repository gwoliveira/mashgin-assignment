import React, { useContext, useState } from 'react';
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
import { createOrder } from '../api';
import CartItem from '../components/CartItem';
import { useNavigate, Link } from 'react-router-dom';
import { IMaskInput } from 'react-imask';

const TextMaskAdapter = React.forwardRef(function TextMaskAdapter(props, ref) {
  const { onChange, ...other } = props;
  return (
    <IMaskInput
      {...other}
      mask="00/00"
      inputRef={ref}
      onAccept={(value) => onChange({ target: { name: props.name, value } })}
      overwrite
    />
  );
});

const CardNumberMaskAdapter = React.forwardRef(function CardNumberMaskAdapter(props, ref) {
  const { onChange, ...other } = props;
  return (
    <IMaskInput
      {...other}
      mask="0000 0000 0000 0000"
      inputRef={ref}
      onAccept={(value) => onChange({ target: { name: props.name, value } })}
      overwrite
    />
  );
});

const Checkout = () => {
  const { cartItems, getCartTotal, clearCart } = useContext(CartContext);
  const navigate = useNavigate();
  const [cardNumber, setCardNumber] = useState('');
  const [cardHolder, setCardHolder] = useState('');
  const [expirationDate, setExpirationDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handlePurchase = async () => {
    const order = {
      items: cartItems.map(item => ({
        item_id: item.id,
        quantity: item.quantity,
      })),
      payment: {
        card_number: cardNumber,
        card_holder: cardHolder,
        expiration_date: expirationDate,
        cvv: cvv,
      },
    };

    try {
      setErrorMessage('');
      const response = await createOrder(order);
      const orderId = response.data.id;
      clearCart();
      navigate(`/order/${orderId}`);
    } catch (error) {
      console.error('Error creating order:', error);
      if (error.response && error.response.data && error.response.data.detail) {
        setErrorMessage(error.response.data.detail[0].msg);
      } else {
        setErrorMessage('There was an error with your purchase. Please try again.');
      }
    }
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
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
              InputProps={{
                inputComponent: CardNumberMaskAdapter,
              }}
            />
            <TextField
              label="Card Holder"
              variant="outlined"
              fullWidth
              sx={{ mb: 2 }}
              value={cardHolder}
              onChange={(e) => setCardHolder(e.target.value)}
            />
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  label="Expiry Date"
                  variant="outlined"
                  fullWidth
                  sx={{ mb: 2 }}
                  value={expirationDate}
                  onChange={(e) => setExpirationDate(e.target.value)}
                  InputProps={{
                    inputComponent: TextMaskAdapter,
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="CVV"
                  variant="outlined"
                  fullWidth
                  sx={{ mb: 2 }}
                  value={cvv}
                  onChange={(e) => setCvv(e.target.value)}
                />
              </Grid>
            </Grid>
            {errorMessage && (
              <Typography color="error" sx={{ mb: 2 }}>
                {errorMessage}
              </Typography>
            )}
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
              <Link to="/" style={{ textDecoration: 'none', width: 'a100%' }}>
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
