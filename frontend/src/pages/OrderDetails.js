import React from 'react';
import { Box, Typography, Paper, Divider } from '@mui/material';

const OrderDetails = () => {
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
        {/* Order details will be displayed here */}
      </Paper>
    </Box>
  );
};

export default OrderDetails;
