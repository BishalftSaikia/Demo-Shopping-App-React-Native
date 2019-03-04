import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList
} from "react-native";
import NavBar from "./navBar";
import { ProductConsumer } from "./productContext";
import CardItem from "./cardItem";
import Icon from "react-native-vector-icons/Feather";

export default class Cart extends Component {
  render() {
    return (
      <ProductConsumer>
        {value => {
          if (value.cart.length != 0) {
            return (
              <View style={styles.container}>
                <NavBar disableCart={true} title="Shopping Cart" />
                <View
                  style={{
                    width: "100%",
                    height: "10%",
                    justifyContent: "center",
                    alignItems: "center"
                  }}
                >
                  <Text style={{ color: "rgb(28,28,28)", fontSize: 20 }}>
                    Items in Cart({value.cart.length} item)
                  </Text>
                  <Text style={{ color: "rgb(28,28,28)", fontSize: 20 }}>
                    Total Cost : Rs.{value.total} /-
                  </Text>
                </View>
                <FlatList
                  data={value.cart}
                  keyExtractor={value => value.id.toString()}
                  renderItem={({ item, index }) => (
                    <CardItem item={item} index={index} />
                  )}
                />

                <TouchableOpacity
                  style={styles.floatingBtn}
                  onPress={() => value.razorPay()}
                >
                  <Icon name="arrow-right" size={22} color="rgb(204,205,206)" />
                </TouchableOpacity>
              </View>
            );
          } else {
            return (
              <View style={styles.container}>
                <NavBar disableCart={true} title="Shopping Cart" />
                <View
                  style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center"
                  }}
                >
                  <Text style={{ fontSize: 20 }}>Cart is Empty</Text>
                </View>
              </View>
            );
          }
        }}
      </ProductConsumer>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgb(204,205,206)"
  },
  floatingBtn: {
    position: "absolute",
    bottom: 10,
    right: 10,
    height: 50,
    width: 50,
    backgroundColor: "rgb(28,28,28)",
    borderColor: "rgb(28,28,28)",
    borderRadius: 100,
    borderWidth: 1,
    elevation: 10,
    justifyContent: "center",
    alignItems: "center"
  }
});
