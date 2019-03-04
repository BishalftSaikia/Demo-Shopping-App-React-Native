import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ToastAndroid
} from "react-native";
import NavBar from "./navBar";
import { ProductConsumer } from "./productContext";

export default class Details extends Component {
  render() {
    const itemIndex = this.props.itemIndex;
    return (
      <ProductConsumer>
        {value => {
          const product = value.productArray[itemIndex];
          return (
            <View style={styles.container}>
              <NavBar title="Details" />
              <View
                style={{ flex: 3, padding: 10, width: "100%", height: "100%" }}
              >
                <Image
                  source={product.img}
                  style={{ flex: 1, width: null, height: null }}
                />
              </View>

              <View
                style={{
                  flex: 1.5,
                  backgroundColor: "rgb(28,28,28)"
                }}
              >
                <View style={{ flex: 1, marginLeft: 10, flexDirection: "row" }}>
                  <View style={styles.v1}>
                    <Text style={{ color: "white" }}>{product.title}</Text>
                    <Text style={{ color: "white" }}>by {product.company}</Text>
                  </View>
                  <View
                    style={[
                      styles.v1,
                      { alignItems: "flex-end", marginRight: 10 }
                    ]}
                  >
                    <Text style={{ color: "white" }}>Rs. {product.price}</Text>
                  </View>
                </View>
                <View style={[styles.v1, { alignItems: "center" }]}>
                  <TouchableOpacity
                    style={styles.btnCart}
                    onPress={() => {
                      if (!product.inCart) {
                        value.modifyCart(product.id, "add");
                      } else {
                        ToastAndroid.showWithGravity(
                          "Already In Cart",
                          ToastAndroid.LONG,
                          ToastAndroid.TOP
                        );
                      }
                    }}
                  >
                    <Text style={{ color: "rgb(146,101,56)", fontSize: 18 }}>
                      Add to Cart
                    </Text>
                  </TouchableOpacity>
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
    flex: 1
  },
  btnCart: {
    height: 30,
    width: "40%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
    paddingRight: 8,
    borderColor: "rgb(146,101,56)",
    borderWidth: 1,
    borderRadius: 10
  },
  v1: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-start"
  }
});
