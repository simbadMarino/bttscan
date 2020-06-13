import React, { Component } from "react";
import "typeface-roboto"; //Importing roboto font
import Utils from "./utils";
import PersistentDrawerLeft from "./UI/ui.js";
import {
  Container,
  //ReaderContainer,
  //Bar,
  //Logo,
  //CloseButton,
  //CloseIcon,
  //FontSizeButton
} from "./Components";
//var title = "";
const storage = global.localStorage || null;

const FOUNDATION_ADDRESS = "TWiWt5SEDzaEqS6kE5gandWMNfxR2B5xzg";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tronWeb: {
        installed: false,
        loggedIn: false
      },
      fullscreen: false,
      largeText: false
    };
    this.rendition = null;
  }

  async componentDidMount() {
    await new Promise(resolve => {
      const tronWebState = {
        installed: !!window.tronWeb,
        loggedIn: window.tronWeb && window.tronWeb.ready
      };

      if (tronWebState.installed) {
        this.setState({
          tronWeb: tronWebState
        });

        return resolve();
      }

      let tries = 0;

      const timer = setInterval(() => {
        if (tries >= 10) {
          //const TRONGRID_API = "https://sun.tronex.io";

          //  window.tronWeb = new SunWeb("https://mainapi.trongrid.io",'https://sideapi.trongrid.io',"https://sun.tronex.io");

          this.setState({
            tronWeb: {
              installed: false,
              loggedIn: false
            }
          });
          clearInterval(timer);
          return resolve();
        }

        tronWebState.installed = !!window.tronWeb;
        tronWebState.loggedIn = window.tronWeb && window.tronWeb.ready;

        if (!tronWebState.installed) {
          return tries++;
        //  console.log("Retries: " + tries);
        }

        this.setState({
          tronWeb: tronWebState
        });

        resolve();
      }, 100);
    });

    if (!this.state.tronWeb.loggedIn) {

        try
        {

          // Set default address (foundation address) used for contract calls
          // Directly overwrites the address object if TronLink disabled the
          // function call
          window.tronWeb.defaultAddress = {
            hex: window.tronWeb.address.toHex(FOUNDATION_ADDRESS),
            base58: FOUNDATION_ADDRESS
          };

          window.tronWeb.on("addressChange", () => {
            if (this.state.tronWeb.loggedIn) {
              return;
            }

            this.setState({
              tronWeb: {
                installed: true,
                loggedIn: true
              }
            });
          });
        }
        catch( e )
        {
          console.log("Tronlink is deactivated, TRON wallet functions deactivated");
          
        }
  }

    Utils.setTronWeb(window.tronWeb);
  }

  toggleFullscreen = () => {
    this.setState(
      {
        fullscreen: !this.state.fullscreen
      },
      () => {
        setTimeout(() => {
          const evt = document.createEvent("UIEvents");
          evt.initUIEvent("resize", true, false, global, 0);
        }, 1000);
      }
    );
  };

  onLocationChanged = location => {
    this.setState(
      {
        location
      },
      () => {
        storage && storage.setItem("epub-location", location);
      }
    );
  };

  onToggleFontSize = () => {
    const nextState = !this.state.largeText;
    this.setState(
      {
        largeText: nextState
      },
      () => {
        this.rendition.themes.fontSize(nextState ? "120%" : "100%");
      }
    );
  };

  getRendition = rendition => {
    // Set inital font-size, and add a pointer to rendition for later updates
    const { largeText } = this.state;
    this.rendition = rendition;
    rendition.themes.fontSize(largeText ? "120%" : "100%");
  };

  render() {
    //if (!this.state.tronWeb.installed) return <TronLinkGuide />;  //This will pop up the tronlink guide to install

    //if (!this.state.tronWeb.loggedIn) return <TronLinkGuide installed />; //This will pop up the tronlink installed but not logged in advice
    //const { fullscreen, location } = this.state;
    return (
      <Container>
        <PersistentDrawerLeft />
      </Container>
    );
  }
}

export default App;
