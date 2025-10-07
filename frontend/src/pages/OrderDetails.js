import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Box, Typography, Paper, Divider, List, ListItem, ListItemText, CircularProgress, Alert, Grid, Button } from '@mui/material';
import { getOrderDetails } from '../api';

const OrderDetails = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let timer;

    const fetchOrderDetails = async () => {
      try {
        const response = await getOrderDetails(orderId);
        setOrder(response.data);
        if (response.data.status === 'PENDING') {
          timer = setTimeout(fetchOrderDetails, 5000);
        }
      } catch (err) {
        setError('Failed to fetch order details.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetails();

    return () => {
      clearTimeout(timer);
    };
  }, [orderId]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  if (!order) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert severity="info">No order details found.</Alert>
      </Box>
    );
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', p: 3 }}>
      <Paper elevation={3} sx={{
        width: '100%',
        maxWidth: 400,
        p: 3,
        mt: 4,
        fontFamily: 'monospace',
        bgcolor: '#f9f9f9',
        border: '1px dashed #ccc'
      }}>
        <Typography variant="h5" component="h1" align="center" gutterBottom sx={{ fontWeight: 'bold' }}>
          Order Receipt
        </Typography>
        <Divider sx={{ my: 2, borderStyle: 'dashed' }} />

        <Grid container spacing={1}>
          <Grid item xs={6}><Typography variant="body2">Order ID:</Typography></Grid>
          <Grid item xs={6}><Typography variant="body2" align="right">{order.id}</Typography></Grid>

          <Grid item xs={6}><Typography variant="body2">Status:</Typography></Grid>
          <Grid item xs={6}><Typography variant="body2" align="right">{order.status}</Typography></Grid>

          <Grid item xs={6}><Typography variant="body2">Date:</Typography></Grid>
          <Grid item xs={6}><Typography variant="body2" align="right">{new Date().toLocaleDateString()}</Typography></Grid>
        </Grid>

        <Divider sx={{ my: 2, borderStyle: 'dashed' }} />

        <Typography variant="h6" component="h2" gutterBottom sx={{ fontWeight: 'bold' }}>
          Items
        </Typography>
        <List dense sx={{ p: 0 }}>
          {order.items.map((item) => (
            <ListItem key={item.id} sx={{ px: 0, py: 0.5 }}>
              <Grid container>
                <Grid item xs={6}><Typography variant="body2">{item.item.name}</Typography></Grid>
                <Grid item xs={2}><Typography variant="body2" align="center">x{item.quantity}</Typography></Grid>
                <Grid item xs={4}><Typography variant="body2" align="right">${(item.price * item.quantity).toFixed(2)}</Typography></Grid>
              </Grid>
            </ListItem>
          ))}
        </List>

        <Divider sx={{ my: 2, borderStyle: 'dashed' }} />

        <Grid container>
          <Grid item xs={6}><Typography variant="h6">Total:</Typography></Grid>
          <Grid item xs={6}><Typography variant="h6" align="right">${order.total_price.toFixed(2)}</Typography></Grid>
        </Grid>

        <Divider sx={{ my: 2, borderStyle: 'dashed' }} />

        <Typography variant="body2" align="center" sx={{ mt: 2 }}>
          Thank you for your purchase!
        </Typography>
      </Paper>
      <Box sx={{ mt: 2 }}>
        <Link to="/" style={{ textDecoration: 'none' }}>
          <Button variant="outlined" color="secondary">
            Back to Menu
          </Button>
        </Link>
      </Box>
    </Box>
  );
};

export default OrderDetails;
