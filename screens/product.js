import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { Actions } from "react-native-router-flux";
import { ProductConsumer } from "./productContext";

export default class Product extends React.Component {
  render() {
    const width = (this.props.screenWidth - 12) / 2;
    const itemIndex = this.props.itemIndex;
    return (
      <ProductConsumer>
        {value => {
          const item = value.productArray[itemIndex];
          return (
            <TouchableOpacity
              onPress={() => Actions.push("details", { itemIndex: itemIndex })}
              style={[styles.container, { width }]}
            >
              <View
                style={{
                  flex: 4,
                  padding: 8,
                  width,
                  height: 170
                }}
              >
                <Image
                  style={{ flex: 1, width: null, height: null }}
                  source={item.img}
                />
              </View>

              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center"
                }}
              >
                <Text style={{ color: "rgb(28,28,28)" }}>{item.title}</Text>
              </View>
            </TouchableOpacity>
          );
        }}
      </ProductConsumer>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    height: 220,
    backgroundColor: "#fff",
    elevation: 5,
    flexDirection: "column",
    marginLeft: 1,
    marginRight: 1,
    marginTop: 8,
    borderRadius: 10
  }
});
