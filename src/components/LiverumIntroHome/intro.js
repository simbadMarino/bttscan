import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";


const useStyles = makeStyles({
  card: {
    maxWidth: 645
  },
  media: {
    height: 200,
    maxHeight: 450
  }
});

export default function MediaCard() {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <CardActionArea>
        <CardMedia className={classes.media} />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            BitTorrent BTT token
          </Typography>
          <Typography variant="subtitle1" color="textSecondary" component="p">
            BTT hodlers will enjoy this site (I hope)
          </Typography>
          <Typography variant="subtitle2" color="textSecondary" component="p">
            Site building in progress
          </Typography>
          <Typography variant="subtitle2" color="textPrimary" component="p">
            Built by TRON-BTT enthusiasts, for TRON-BTT community
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
