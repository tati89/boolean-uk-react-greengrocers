import CartItem from "./CartItem";
import StoreItem from "./StoreItem";

function Main({
  store,
  cart,
  addItemToCart,
  increaseQuantity,
  decreaseQuantity,
}) {
  let total = 0;
  for (const item of cart) {
    total += item.quantity * item.price;
  }

  return (
    <div>
      <header id="store">
        <h1>Greengrocers</h1>
        <ul className="item-list store--item-list">
          {store.map((item, index) => (
            <StoreItem item={item} addItemToCart={addItemToCart} key={index} />
          ))}
        </ul>
      </header>
      <main id="cart">
        <h2>Your Cart</h2>
        <div className="cart--item-list-container">
          <ul className="item-list cart--item-list">
            {cart.map((item, index) => (
              <CartItem
                key={index}
                item={item}
                decreaseQuantity={decreaseQuantity}
                increaseQuantity={increaseQuantity}
              />
            ))}
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

export default Main;
