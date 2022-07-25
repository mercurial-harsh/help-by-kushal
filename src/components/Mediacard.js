import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";

import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import { CardContent } from "@mui/material";

export default function MediaCard({ src }) {
  return (
    <Card sx={{ maxWidth: 345 }}>
      
      <CardContent><img src={src} style={{width:"90%",height:"200px"}}></img></CardContent>
    </Card>
  );
}
