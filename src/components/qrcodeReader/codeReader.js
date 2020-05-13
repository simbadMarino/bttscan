import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Button from "@material-ui/core/Button";
import BookExchange from "../files/bookExchange.png";
import NumericInput from "react-numeric-input";
import Divider from "@material-ui/core/Divider";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { tileDataMod } from "../TronLinkInfo/index.js";
import { tileDataModSide } from "../TronLinkInfo/index.js";
import { sunNetworkAliveFlag } from "../TronLinkInfo/index.js";
import TextField from "@material-ui/core/TextField";
import { mainchain } from "../TronLinkInfo/index.js";
import { sidechain } from "../TronLinkInfo/index.js";
import { liverumWeb } from "../TronLinkInfo/index.js";
import SunWeb from "sunweb";
var bookToTransfer = "";
var addyToTransfer = "";
var tokenPrecision = 0;
const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2)
    }
  },
  button: {
    display: "block",
    marginTop: theme.spacing(2)
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  }
}));

export default function ControlledOpenSelect() {
  
}

/*  <Divider />
  <NumericInput min={1} max={100} mobile="auto" size={1} />

  */
