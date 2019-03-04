import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ImageBackground
} from "react-native";
import * as firebase from "firebase";
import Icon from "react-native-vector-icons/Feather";
import { Actions } from "react-native-router-flux";

export default class SideMenu extends Component {
  state = {
    user: null
  };
  signOut = () => {
    firebase
      .auth()
      .signOut()
      .catch(error => console.log(error));
  };
  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      this.setState({ user });
    });
  }
  render() {
    return (
      <View style={{ flex: 1 }}>
        <View
          style={{
            height: "25%",
            width: "100%"
          }}
        >
          <ImageBackground
            source={require("./img/cover.jpg")}
            style={{
              height: "100%",
              width: "100%"
            }}
          >
            <View
              style={{
                flex: 2,
                justifyContent: "center",
                alignItems: "flex-start",
                paddingLeft: 18
              }}
            >
              <View style={styles.avater}>
                <Icon name="user" size={22} color="rgb(28,28,28)" />
              </View>
            </View>
            {/*..........................................Profile Pic */}
            <View
              style={{
                justifyContent: "center",
                alignItems: "flex-start",
                paddingLeft: 18,
                paddingBottom: 18
              }}
            >
              <Text style={{ color: "white" }} numberOfLines={1}>
                {this.state.user ? this.state.user.email : ""}
              </Text>
            </View>
          </ImageBackground>
        </View>

        <View style={styles.v1}>
          <Icon
            style={{ flex: 1, paddingLeft: 14 }}
            name="shopping-bag"
            size={20}
            color="rgb(28,28,28)"
          />
          <TouchableOpacity
            style={{ flex: 4 }}
            onPress={() => {
              Actions.push("dashboard");
            }}
          >
            <Text style={{ fontSize: 18, color: "rgb(28,28,28)" }}>Home</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.v1}>
          <Icon
            style={{ flex: 1, paddingLeft: 14 }}
            name="settings"
            size={20}
            color="rgb(28,28,28)"
          />
          <TouchableOpacity style={{ flex: 4 }}>
            <Text style={{ fontSize: 18, color: "rgb(28,28,28)" }}>
              Setting
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.v1}>
          <Icon
            style={{ flex: 1, paddingLeft: 14 }}
            name="more-horizontal"
            size={20}
            color="rgb(28,28,28)"
          />
          <TouchableOpacity style={{ flex: 4 }}>
            <Text style={{ fontSize: 18, color: "rgb(28,28,28)" }}>About</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.v1}>
          <Icon
            style={{ flex: 1, paddingLeft: 14 }}
            name="log-out"
            size={20}
            color="rgb(28,28,28)"
          />
          <TouchableOpacity style={{ flex: 4 }} onPress={this.signOut}>
            <Text style={{ fontSize: 18, color: "rgb(28,28,28)" }}>
              Sign Out
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  btnSignOut: {
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent"
  },
  avater: {
    height: 50,
    width: 50,
    borderRadius: 100,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center"
  },
  v1: {
    width: "100%",
    height: "8%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  }
});
