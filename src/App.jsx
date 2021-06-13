import { useState } from "react";
import Main from "./components/Main";

import "./styles/index.css";

const groceries = [
  {
    id: "001-beetroot",
    name: "beetroot",
    price: 0.35,
  },
  {
    id: "002-carrot",
    name: "carrot",
    price: 0.22,
  },
  {
    id: "003-apple",
    name: "apple",
    price: 0.45,
  },
  {
    id: "004-apricot",
    name: "apricot",
    price: 0.55,
  },
  {
    id: "005-avocado",
    name: "avocado",
    price: 0.75,
  },
  {
    id: "006-bananas",
    name: "bananas",
    price: 1.35,
  },
  {
    id: "007-bell-pepper",
    name: "bell-pepper",
    price: 0.35,
  },
  {
    id: "008-berry",
    name: "berry",
    price: 1.75,
  },
  {
    id: "009-blueberry",
    name: "blueberry",
    price: 2.15,
  },
  {
    id: "010-eggplant",
    name: "eggplant",
    price: 0.85,
  },
];

/* 
Your store item should have the following structure

{
  id: "001-beetroot", <- the item id matches the icon name in the assets/icons folder
  name: "beetroot",
  price: 0.35 <- You can come up with your own prices
}

*/

export default function App() {
  const [store, setStore] = useState(groceries);
  const [cart, setCart] = useState([]);

  const addItemToCart = (clickedItem) => {
    const foundInCart = cart.find((item) => clickedItem.id === item.id);
    if (foundInCart) {
      increaseQuantity(clickedItem);
    } else {
      setCart([...cart, { ...clickedItem, quantity: 1 }]);
    }
  };

  const increaseQuantity = (clickedItem) => {
    const updatedCart = cart.map((item) => {
      if (clickedItem.id === item.id) {
        return { ...item, quantity: item.quantity + 1 };
      } else {
        return item;
      }
    });

    setCart(updatedCart);
  };

  const decreaseQuantity = (clickedItem) => {
    const updatedCart = cart
      .map((item) => {
        if (clickedItem === item) {
          return { ...item, quantity: item.quantity - 1 };
        } else {
          return item;
        }
      })
      .filter((item) => {
        return item.quantity > 0;
      });

    setCart(updatedCart);
  };

  return (
    <div className="App">
      <Main
        store={store}
        setStore={setStore}
        cart={cart}
        setCart={setCart}
        addItemToCart={addItemToCart}
        increaseQuantity={increaseQuantity}
        decreaseQuantity={decreaseQuantity}
      />
    </div>
  );
}
