import { useEffect, useState } from "react";

import "./styles/index.css";

/* 
Your store item should have the following structure

{
  id: "001-beetroot", <- the item id matches the icon name in the assets/icons folder
  name: "beetroot",
  price: 0.35 <- You can come up with your own prices
}

*/

export default function App() {
  const [store, setStore] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/groceries")
      .then((response) => response.json())
      .then((groceriesFromServer) => setStore(groceriesFromServer));
  }, []);

  const addItemToCart = (clickedItem) => {
    const foundInCart = cart.find((item) => clickedItem.id === item.id);
    if (foundInCart) {
      increaseQuantity(clickedItem); //NOT WORKING...
    } else {
      fetch("http://localhost:4000/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: clickedItem.id, quantity: 1 }),
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            throw Error("Failed to add item to the cart");
          }
        })
        .then((newCartItem) => {
          setCart([...cart, newCartItem]);
        })
        .catch((error) => console.error(error));
    }
  };

  const increaseQuantity = (clickedItem) => {
    fetch(`http://localhost:4000/cart/${clickedItem.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ quantity: clickedItem.quantity + 1 }),
    })
      .then((response) => {
        return response.json();
      })
      .then((updatedCartItem) => {
        const updatedCart = cart.map((item) => {
          if (updatedCartItem.id === item.id) {
            return updatedCartItem;
          } else {
            return item;
          }
        });

        setCart(updatedCart);
      });
  };

  const decreaseQuantity = (clickedItem) => {
    const foundItem = cart.find((cartItem) => clickedItem.id === cartItem.id);

    if (foundItem.quantity === 1) {
      fetch(`http://localhost:4000/cart/${foundItem.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }).then(function (response) {
        return response.json();
      });
      const updatedCart = cart.filter(
        (cartItem) => cartItem.id !== foundItem.id
      );
      setCart(updatedCart);
    } else {
      fetch(`http://localhost:4000/cart/${clickedItem.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ quantity: clickedItem.quantity - 1 }),
      })
        .then((response) => {
          return response.json();
        })
        .then((updatedCartItem) => {
          const updatedCart = cart.map((item) => {
            if (updatedCartItem.id === item.id) {
              return updatedCartItem;
            } else {
              return item;
            }
          });
          setCart(updatedCart);
        });
    }
  };

  let total = 0;
  for (const item of cart) {
    const storeItem = store.find((storeItem) => {
      return item.id === storeItem.id;
    });
    total += item.quantity * storeItem.price;
  }

  return (
    <div>
      <header id="store">
        <h1>Greengrocers</h1>
        <ul className="item-list store--item-list">
          {store.map((item) => (
            <li key={item.id}>
              <div className="store--item-icon">
                <img src={`assets/icons/${item.id}.svg`} alt={item.name} />
              </div>
              <button onClick={() => addItemToCart(item)}>Add to cart</button>
            </li>
          ))}
        </ul>
      </header>
      <main id="cart">
        <h2>Your Cart</h2>
        <div className="cart--item-list-container">
          <ul className="item-list cart--item-list">
            {cart.map((item) => {
              const storeItem = store.find(
                (storeItem) => storeItem.id === item.id
              );
              return (
                <li key={item.id}>
                  <img
                    className="cart--item-icon"
                    src={`assets/icons/${item.id}.svg`}
                    alt={storeItem.name}
                  />
                  <p>{storeItem.name}</p>
                  <button
                    className="quantity-btn remove-btn center"
                    onClick={() => decreaseQuantity(item)}
                  >
                    -
                  </button>
                  <span className="quantity-text center">{item.quantity}</span>
                  <button
                    className="quantity-btn add-btn center"
                    onClick={() => increaseQuantity(item)}
                  >
                    +
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="total-section">
          <div>
            <h3>Total</h3>
          </div>
          <div>
            <span className="total-number">£{total.toFixed(2)}</span>
          </div>
        </div>
      </main>
      <div>
        Icons made by
        <a
          href="https://www.flaticon.com/authors/icongeek26"
          title="Icongeek26"
        >
          Icongeek26
        </a>
        from
        <a href="https://www.flaticon.com/" title="Flaticon">
          www.flaticon.com
        </a>
      </div>
    </div>
  );
}
