import React, { Component } from "react";
import Divider from "@material-ui/core/Divider";
import "./TronLinkInfo.scss";
import TronWeb from "tronweb";
import Typography from "@material-ui/core/Typography";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
//import MediaCard from "../LiverumIntroHome/intro.js";
export var tokenIDs = [];
export var tileDataMod = [];
export var tokenQty = [];
//export var rows= [];

export var tokenIDsSide = [];
export var tileDataModSide = [];
export var tokenQtySide = [];
//export var sunNetworkAliveFlag = 0;
export var tronAddress = "";
var j = 0;
//const mainGatewayAddress = "TWaPZru6PR5VjgT4sJrrZ481Zgp3iJ8Rfo";
//const sideGatewayAddress = "TGKotco6YoULzbYisTBuP6DWXDjEgJSpYz";
//const sideChainId = "41E209E4DE650F0150788E8EC5CAFA240A23EB8EB7";

export const mainchain = new TronWeb({
  fullNode: "https://api.trongrid.io",
  solidityNode: "https://api.trongrid.io",
  eventServer: "https://api.trongrid.io"
});







async function myFunction(item, index) {
  for (var i = 0; i < tokenIDs.length; i++) {
    if (tokenIDs[i] === item.tokenid) {
      console.log("match in: " + i + " " + j);
      //tileDataMod[j] = tileData[index];
      console.log("Token ID: " + tokenIDs[i]);
      j++;
    }
  }
}

export default class TronLinkInfo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      accountAddressMainChain: "account address will show up here",
      accountBalanceMainChain: "account balance will show up here",
      accountBandwidthMainChain: "account bandwidth will show up here",
      accountTokensValueMainChain: "account tokens will show up here",
      accountTokensNameMainChain: "accout tokens name will show up here",
      accountNumberOfTokensMainChain: "account total no. of tokens",
      accountTokenIdsMainChain: "accout tokens"
    };
  }

  // Uncomment each call one at a time to see your account information filled out
  componentDidMount() {
    this.fetchAccountAddressMain();
    this.fetchAccountBalanceMain();
    this.fetchAccountBandwidthMain();
  //  this.getTokensBalanceMain();
  }

  /*********************************Main Chain functions:*********************************************/

  async fetchAccountAddressMain() {
    try {
          const account = await window.tronWeb.trx.getAccount();
          const accountAddress = account.address; // HexString(Ascii)
          const accountAddressInBase58 = window.tronWeb.address.fromHex(
            accountAddress
          ); // Base58
          tronAddress = accountAddressInBase58;
          this.setState({
            accountAddressMainChain: accountAddressInBase58
          });
        }
          catch( e )
          {
            console.log("Tronlink is deactivated, TRON wallet functions deactivated");
          }

  }
  //
  // // The function below will return the account balance in SUN as a number
  async fetchAccountBalanceMain() {
    try {
          const balanceInSun = await window.tronWeb.trx.getBalance(); //number
          const balanceInTRX = window.tronWeb.fromSun(balanceInSun); //string
          //const changeBackToSun = window.tronWeb.toSun(balanceInTRX); //string

          this.setState({
            accountBalanceMainChain: balanceInTRX
          });
        }
        catch (e)
        {
          return;
        }
  }
  //
  // // The function below will return the account bandwidth as a number
  async fetchAccountBandwidthMain() {
    try {
          const accountBandwidth = await window.tronWeb.trx.getBandwidth(); // number
          this.setState({
            accountBandwidthMainChain: accountBandwidth
          });
        }
        catch( e ){
          return;
        }
  }

  async getTokensBalanceMain() {
    //const WALLET_ADDRESS = 'TRxrmHDysqAMHNo2eEtSvcMoJpDnWLqnZ4';
    var tokenName = [];

    var books;
    var i;
    var tokenValue = [];
    let info = await window.tronWeb.trx.getAccount();
    var tokenTotals = 0;
    var tokenQuantityPositiveBalance = 0;
    //  window.alert("Wait until Book List update finishes...")

    //  "**********************MAIN CHAIN PROCESS***************************"

    try {
      tokenTotals = info.assetV2.length;
      //console.log("Number of tokens: " + tokenTotals);

      for (i = 0; i < tokenTotals; i++) {
        if (info.assetV2[i].value > 0) {
          //Ignore assets with 0 banlance
          tokenQuantityPositiveBalance++; //Getting total amount of tokens with positive balance
          tokenIDs[i] = info.assetV2[i].key; //Taking token IDs
          books = await window.tronWeb.trx.getTokenFromID(tokenIDs[i]);
          console.log(books);
          tokenName[i] = books.name;
          tokenValue[i] = info.assetV2[i].value / Math.pow(10, books.precision); //Taking token values(Number of books per token)
          console.log(tokenIDs[i] + " " + tokenName[i] + " = " + tokenValue[i]); //Debug sentence
        }
      }
      /*tokenIDs = tokenIDs.filter(function (el) {
                    return el != null;
                });*/
    } catch (e) {
      console.log("No TokenBooks found in wallet, please check");
    }
    tokenName = tokenName.filter(function(el) {
      return el != null;
    });

    tokenValue = tokenValue.filter(function(el) {
      return el != null;
    });
    tokenQty = tokenValue;

    //let booksjson = require("../bookList/books.json");
    console.log(tokenIDs);

  //  tileData.forEach(myFunction);
    j = 0;
  //  console.log(tileDataMod);
    //console.log(booksjson.tokenId[1]);

    this.setState({
      accountTokensValueMainChain: tokenValue,
      accountTokensNameMainChain: tokenName,
    //  accountNumberOfTokensMainChain: tokenQuantityPositiveBalance,
      accountTokenIdsMainChain: tokenIDs
    });

    console.log(
      "Number of tokens with positive balance: " + tokenQuantityPositiveBalance
    );
    //window.tronWeb.trx.sendToken("TYGajccn93oPPUvGfiueu8x7fMkVEPDgMB", 1000000, "1002736")
    //window.alert("Book list updated :)");
  }


  /*************************Render**************************************************/

  render() {
    const {
      accountAddressMainChain,
      accountBalanceMainChain,
      accountBandwidthMainChain,
      //accountTokensValueMainChain,
      //accountTokensNameMainChain,
      //accountNumberOfTokensMainChain,
      //accountTokenIdsMainChain
    } = this.state;
    return (
      <div className="tronLinkInfo-component-container">
        <Divider />
         <ExpansionPanel>
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography className="heading">BTFS Address</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography>
              <div className="account-info-address">
                Address: <span>{accountAddressMainChain}</span>
              </div>
              <div className="account-info-balance">
                TRON Balance: <span>{accountBalanceMainChain}</span>
              </div>
              <div className="account-info-bandwidth">
                Bandwidth: <span>{accountBandwidthMainChain}</span>
              </div>
            </Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </div>
    );
  }
}
