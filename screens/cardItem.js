import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity
} from "react-native";
import { ProductConsumer } from "./productContext";

const screenHeight = Dimensions.get("window").height;

export default class CardItem extends Component {
  render() {
    return (
      <ProductConsumer>
        {value => {
          const product = this.props.item;
          const { index } = this.props;
          return (
            <View style={styles.container}>
              <TouchableOpacity
                style={styles.removeBtn}
                onPress={() => value.modifyCart(product.id, "remove")}
              />
              <View style={styles.v1}>
                <Image
                  style={{ flex: 1, width: null, height: null }}
                  source={product.img}
                />
              </View>
              <View style={styles.v2}>
                <View style={{ flex: 2 }}>
                  <Text style={{ fontSize: 20, color: "black" }}>
                    {product.title}
                  </Text>
                  <Text style={{ fontSize: 15, color: "black" }}>
                    ({product.company})
                  </Text>
                  <Text style={{ fontSize: 15, color: "black", marginTop: 18 }}>
                    Rs. {product.price}/-
                  </Text>
                </View>

                <View
                  style={{
                    flex: 1,
                    flexDirection: "row",
                    marginTop: 18
                  }}
                >
                  <View
                    style={{
                      flex: 1
                    }}
                  >
                    <TouchableOpacity
                      style={styles.btn}
                      onPress={() => value.modifyItem(product.id, "decrement")}
                    >
                      <Text>-</Text>
                    </TouchableOpacity>
                  </View>

                  <View
                    style={{
                      flex: 1,
                      alignItems: "flex-start"
                    }}
                  >
                    <Text style={{ fontSize: 15, color: "black" }}>
                      {value.cart[index].count}
                    </Text>
                  </View>

                  <View
                    style={{
                      flex: 1
                    }}
                  >
                    <TouchableOpacity
                      style={styles.btn}
                      onPress={() => value.modifyItem(product.id, "increment")}
                    >
                      <Text>+</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          );
        }}
      </ProductConsumer>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    width: "95%",
    height: 0.3 * screenHeight,
    margin: 10,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "grey",
    elevation: 10,
    flexDirection: "row",
    borderRadius: 10
  },
  v1: {
    flex: 1,
    padding: 8,
    width: "100%",
    height: "100%"
  },
  v2: {
    flex: 1,
    width: "100%",
    height: "100%",
    alignItems: "center",
    paddingTop: 18,
    paddingRight: 10
  },
  removeBtn: {
    width: 10,
    height: 10,
    position: "absolute",
    borderRadius: 50,
    top: 5,
    right: 5,
    backgroundColor: "rgb(255,79,71)",
    justifyContent: "center",
    alignItems: "center"
  },
  btn: {
    width: 20,
    height: 20,
    borderRadius: 50,
    backgroundColor: "white",
    elevation: 10,
    justifyContent: "center",
    alignItems: "center"
  }
});
