import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions
} from "react-native";
import Icon from "react-native-vector-icons/Feather";
import { Actions } from "react-native-router-flux";

const screenHeight = Dimensions.get("window").height;
const navBarHeight = 0.1 * screenHeight;

export default class NavBar extends Component {
  static defaultProps = {
    disableCart: false
  };

  render() {
    return (
      <View style={styles.navBar}>
        <TouchableOpacity
          style={{ flex: 0.5, justifyContent: "center", marginLeft: 10 }}
          onPress={() =>
            this.props.title === "Shopping Cart"
              ? Actions.jump("dashboard")
              : Actions.drawerOpen()
          }
        >
          <Icon
            name={this.props.title === "Shopping Cart" ? "arrow-left" : "list"}
            size={22}
            color="#fff"
          />
        </TouchableOpacity>
        <View
          style={{
            flex: 2,
            justifyContent: "flex-start",
            paddingLeft: 12
          }}
        >
          <Text style={{ color: "white", fontSize: 18 }}>
            {this.props.title}
          </Text>
        </View>
        <View
          style={{
            flex: 1.5,
            justifyContent: "flex-end",
            alignItems: "flex-end",
            marginRight: 12
          }}
        >
          <TouchableOpacity
            disabled={this.props.disableCart}
            onPress={() => {
              Actions.push("cart");
            }}
          >
            <Icon name="shopping-cart" size={20} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  navBar: {
    height: navBarHeight,
    flexDirection: "row",
    backgroundColor: "rgba(146,101,56,0.6)",
    alignItems: "center",
    borderBottomColor: "grey",
    borderBottomWidth: 1
  }
});
