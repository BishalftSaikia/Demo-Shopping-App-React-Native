import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  FlatList,
  StatusBar
} from "react-native";
import Product from "./product";
import NavBar from "./navBar";
import { ProductConsumer } from "./productContext";
const screenWidth = Dimensions.get("window").width;

export default class Dashboard extends Component {
  render() {
    return (
      <ProductConsumer>
        {value => {
          return (
            <View style={styles.container}>
              <StatusBar
                backgroundColor="rgba(146,101,56,0.6)"
                barStyle="light-content"
              />
              <NavBar title="Product List" />
              <FlatList
                data={value.productArray}
                style={{
                  flex: 1,
                  backgroundColor: "rgb(204,205,206)",
                  paddingTop: 4,
                  paddingLeft: 3,
                  paddingRight: 3
                }}
                ListFooterComponent={() => (
                  <View style={{ height: 0, marginBottom: 18 }} />
                )}
                numColumns={2}
                renderItem={({ index }) => (
                  <Product itemIndex={index} screenWidth={screenWidth} />
                )}
                keyExtractor={value => value.id}
              />
            </View>
          );
        }}
      </ProductConsumer>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgb(204,205,206)",
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});
