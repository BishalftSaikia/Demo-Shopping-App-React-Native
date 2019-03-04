import React, { Component } from "react";
import { BackHandler } from "react-native";
import * as firebase from "firebase";
import { Router, Stack, Scene, Actions } from "react-native-router-flux";
import Loading from "./screens/loading";
import LogIn from "./screens/logIn";
import Dashboard from "./screens/dashboard";
import Details from "./screens/details";
import Cart from "./screens/cart";
import { ProductProvider } from "./screens/productContext";
import SideMenu from "./screens/sideMenu";
import SignUp from "./screens/signUp";

const config = {
  apiKey: "AIzaSyDb3icaaBk6f2O9GvkrYFISayAwJsZx1AI",
  authDomain: "reactfirebase-14dcf.firebaseapp.com",
  databaseURL: "https://reactfirebase-14dcf.firebaseio.com",
  projectId: "reactfirebase-14dcf",
  storageBucket: "reactfirebase-14dcf.appspot.com",
  messagingSenderId: "1013494828707"
};
firebase.initializeApp(config);

export default class App extends Component {
  componentWillMount() {
    BackHandler.addEventListener("hardwareBackPress", this.onBackPress);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.onBackPress);
  }

  onBackPress = () => {
    if (
      Actions.currentScene === "dashboard" ||
      Actions.currentScene === "logIn" ||
      Actions.currentScene === "signUp"
    ) {
      BackHandler.exitApp();
    }
  };
  render() {
    return (
      <ProductProvider>
        <Router backAndroidHandler={() => this.onBackPress()}>
          <Scene
            drawer={true}
            hideNavBar
            key="drawerMenu"
            contentComponent={SideMenu}
            drawerWidth={250}
            drawerPosition="left"
          >
            <Stack key="rootStack" hideNavBar>
              <Scene component={Loading} key="loading" hideNavBar />
              <Scene component={LogIn} key="logIn" hideNavBar />
              <Scene component={SignUp} key="signUp" hideNavBar />
              <Scene component={Dashboard} key="dashboard" hideNavBar />
              <Scene component={Details} key="details" hideNavBar />
              <Scene component={Cart} key="cart" hideNavBar />
            </Stack>
          </Scene>
        </Router>
      </ProductProvider>
    );
  }
}
