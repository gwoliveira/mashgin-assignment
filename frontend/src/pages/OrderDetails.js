import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography, Paper, Divider, List, ListItem, ListItemText, CircularProgress, Alert } from '@mui/material';
import { getOrderDetails } from '../api';

const OrderDetails = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await getOrderDetails(orderId);
        setOrder(response.data);
      } catch (err) {
        setError('Failed to fetch order details.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetails();
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
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Order Details
      </Typography>
      <Paper elevation={3} sx={{ p: 2 }}>
        <Typography variant="h6" component="h2" gutterBottom>
          Order Summary
        </Typography>
        <Divider sx={{ mb: 2 }} />
        <Typography variant="body1"><strong>Order ID:</strong> {order.id}</Typography>
        <Typography variant="body1"><strong>Status:</strong> {order.status}</Typography>
        <Typography variant="body1"><strong>Total Price:</strong> ${order.total_price.toFixed(2)}</Typography>

        <Typography variant="h6" component="h3" sx={{ mt: 3, mb: 1 }}>
          Items
        </Typography>
        <List>
          {order.items.map((item) => (
            <ListItem key={item.id} divider>
              <ListItemText
                primary={`${item.item.name} x ${item.quantity}`}
                secondary={`Price: $${item.price.toFixed(2)} each`}
              />
            </ListItem>
          ))}
        </List>
      </Paper>
    </Box>
  );
};

export default OrderDetails;
