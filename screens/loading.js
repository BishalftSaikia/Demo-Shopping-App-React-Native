import React, { Component } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import * as firebase from "firebase";
import { Actions } from "react-native-router-flux";

export default class Loading extends Component {
  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        Actions.push("dashboard", { user });
      } else {
        Actions.push("logIn");
      }
    });
  }
  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator color="rgb(28,28,28)" size="large" />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center"
  }
});
