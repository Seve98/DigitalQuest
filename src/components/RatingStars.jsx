import * as React from 'react';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';


export default function RatingStars({value}) {


  

  return (
    <Box sx={{ '& > legend': { mt: 5} }}>
  
      
      <Rating name="read-only" value={value} precision={0.5} readOnly />
     
    </Box>
  );
}