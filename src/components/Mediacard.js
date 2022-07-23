import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';

import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';


export default function MediaCard({src}) {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        height="250"
        image={src}
        alt="a product"
      />
      
      <CardActions>
        <Button size="small">Offers</Button>
        <Button size="small">Search Similar</Button>
      </CardActions>
    </Card>
  );
}
