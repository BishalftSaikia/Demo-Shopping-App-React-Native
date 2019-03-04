import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ToastAndroid
} from "react-native";
import * as firebase from "firebase";
import { Actions } from "react-native-router-flux";

export default class LogIn extends Component {
  state = {
    email: "",
    password: ""
  };
  onLogIn = () => {
    firebase
      .auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .catch(err => {
        alert(err);
      });
  };
  render() {
    return (
      <View style={styles.container}>
        <View
          style={{ alignItems: "flex-start", width: "100%", paddingLeft: 18 }}
        >
          <Text style={styles.text}>Email</Text>
          <TextInput
            style={styles.textInput}
            onChangeText={email => {
              this.setState({ email });
            }}
            value={this.state.email}
            placeholder="...@gmail.com"
          />
        </View>
        <View
          style={{ alignItems: "flex-start", width: "100%", paddingLeft: 18 }}
        >
          <Text style={styles.text}>Password</Text>
          <TextInput
            style={styles.textInput}
            onChangeText={password => {
              this.setState({ password });
            }}
            value={this.state.password}
            placeholder="Enter the Password"
            secureTextEntry
          />
        </View>

        <TouchableOpacity
          style={[styles.logBtn, { backgroundColor: "rgb(60,60,60)" }]}
          onPress={this.onLogIn}
        >
          <Text style={{ color: "white" }}>Log In</Text>
        </TouchableOpacity>
        <View style={{ marginTop: 30, flexDirection: "row" }}>
          <Text>Don't have an account : </Text>
          <TouchableOpacity onPress={() => Actions.push("signUp")}>
            <Text
              style={{
                color: "rgb(146,101,56)",
                textDecorationLine: "underline"
              }}
            >
              Sign Up
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff"
  },
  text: {
    color: "rgb(28,28,28)",
    fontSize: 16,
    marginBottom: 10
  },
  textInput: {
    paddingLeft: 10,
    borderWidth: 0.5,
    borderColor: "rgb(28,28,28)",
    width: "90%",
    height: 35,
    color: "rgb(28,28,28)",
    marginBottom: 18,
    borderRadius: 8
  },
  logBtn: {
    marginTop: 30,
    borderRadius: 50,
    width: "50%",
    height: 32,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgb(146,101,56)"
  }
});
