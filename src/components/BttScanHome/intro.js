import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import BTTLogo from "../files/bttscanlogo.png";
import Paper from '@material-ui/core/Paper';
import CCTechLogo from "../files/network.png";
const useStyles = makeStyles({
  card: {
  maxWidth: 345
  },
  media: {
  height: 345,
  maxHeight: 350
  },
  root: {
    width: '80%',
  },
  container: {
    maxHeight: 640,
  },
});


export default function BttScanIntro() {
  const classes = useStyles();

  return (
<Paper className={classes.root}>
    <CardActionArea>
      <CardMedia
        className={classes.media}
        image={CCTechLogo}
        title="An Eslabon is a fundamental part of a chain"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="h2">
          "Eslabon"
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          We Keep building to bring blockchain solutions to our community
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          .
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          Blockchain and electronics is our passion, we want to use both to growth compassion, achieve happiness and build a better world for future generations
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          .
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
        "If you think you are too small to make a difference, try sleeping with a mosquito" - Dalai Lama
        </Typography>

      </CardContent>
    </CardActionArea>
    <CardActions>
      <Button size="small" color="Black">
        Donate
      </Button>
        <Button size="small" color="Black">
          Learn More
      </Button>
    </CardActions>
  <p>If you find this site useful please consider donating to keep up the development and hosting costs ;)</p>
  <h4>TRON: TRxrmHDysqAMHNo2eEtSvcMoJpDnWLqnZ4</h4>
  <h4>Monero: 47NKoanX7vhTDEjQPiUDbTQC22MnQBhbo5QJbVVMKNEMQi1WrJp44B47uhtpfFy1FRYP6W5chRdYJ3YWSJEfhnAzEqfPym1</h4>

</Paper>
  );
}
