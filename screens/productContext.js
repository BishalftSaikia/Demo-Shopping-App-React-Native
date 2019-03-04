import React, { Component } from "react";
import { storeProducts } from "./data";
import { ToastAndroid, AsyncStorage } from "react-native";
import RazorpayCheckout from "react-native-razorpay";

const ReactContext = React.createContext();

export default class ProductProvider extends Component {
  state = {
    storeProducts,
    cart: [],
    total: 0
  };
  // async componentDidMount() {
  //   let cart = JSON.parse(await AsyncStorage.getItem("cart"));
  //   let total = JSON.parse(await AsyncStorage.getItem("total"));
  //   let storeProducts = JSON.parse(await AsyncStorage.getItem("storeProducts"));
  //   if (cart) {
  //     this.setState({ cart, total, storeProducts });
  //   } else {
  //     this.setState({ storeProducts });
  //   }
  // }
  // componentWillUnmount() {
  //   AsyncStorage.setItem("cart", JSON.stringify(this.state.cart));
  //   AsyncStorage.setItem("total", JSON.stringify(this.state.total));
  //   AsyncStorage.setItem(
  //     "storeProducts",
  //     JSON.stringify(this.state.storeProducts)
  //   );
  // }
  getItem = id => {
    const product = this.state.storeProducts.find(item => item.id === id);
    return product;
  };
  modifyCart = (id, modifyState) => {
    let productArray = [].concat(this.state.storeProducts);
    let cartArray = [].concat(this.state.cart);
    const item = this.getItem(id);
    const productIndex = productArray.indexOf(item);
    const cartIndex = cartArray.indexOf(item);
    let { total } = this.state;
    if (modifyState === "add") {
      productArray[productIndex].inCart = true;
      productArray[productIndex].count = 1;
      total += Number(productArray[productIndex].price); //Adding to total
      this.setState({
        storeProducts: productArray,
        cart: [...this.state.cart, productArray[productIndex]],
        total
      });
      ToastAndroid.show("Product added to the Cart", ToastAndroid.SHORT);
    } else if (modifyState === "remove") {
      total -= Number(cartArray[cartIndex].price) * cartArray[cartIndex].count; //Removing from total
      productArray[productIndex].inCart = false;
      productArray[productIndex].count = 0;
      cartArray.splice(cartIndex, 1);
      this.setState({
        storeProducts: productArray,
        cart: cartArray,
        total
      });
    } else if (modifyState === "emptyCart") {
      this.setState({
        cart: [],
        total: null
      });
    }
  };

  modifyItem = (id, modifyState) => {
    let cartArray = [].concat(this.state.cart);
    let { total } = this.state;
    const item = this.getItem(id);
    const cartIndex = cartArray.indexOf(item);
    if (modifyState === "decrement") {
      if (cartArray[cartIndex].count > 1) {
        cartArray[cartIndex].count -= 1;
        total -= Number(cartArray[cartIndex].price); //incrementing total
        this.setState({ cart: cartArray, total });
      }
    } else if (modifyState === "increment") {
      if (cartArray[cartIndex].count < 5) {
        cartArray[cartIndex].count += 1;
        total += Number(cartArray[cartIndex].price); //decrementing total
        this.setState({ cart: cartArray, total });
      } else {
        ToastAndroid.show(
          "Sorry! Only 5 quantity allowed per Item",
          ToastAndroid.SHORT
        );
      }
    }
  };

  razorPay = () => {
    let options = {
      description: "Credits towards consultation",
      image: "https://i.imgur.com/3g7nmJC.png",
      currency: "INR",
      key: "rzp_test_sKznKeVKnJytKz",
      amount: this.state.total,
      name: "Shooping Cart",
      prefill: {
        email: "void@razorpay.com",
        contact: "9191919191",
        name: "Razorpay Software"
      },
      theme: { color: "#F37254" }
    };
    RazorpayCheckout.open(options)
      .then(data => {
        // handle success
        alert(`Success: ${data.razorpay_payment_id}`);
      })
      .catch(error => {
        // handle failure
        alert(`Error: ${error.code} | ${error.description}`);
      });
  };

  render() {
    return (
      <ReactContext.Provider
        value={{
          productArray: this.state.storeProducts,
          cart: this.state.cart,
          modifyCart: this.modifyCart,
          modifyItem: this.modifyItem,
          total: this.state.total,
          razorPay: this.razorPay
        }}
      >
        {this.props.children}
      </ReactContext.Provider>
    );
  }
}

const ProductConsumer = ReactContext.Consumer;

export { ProductProvider, ProductConsumer };
