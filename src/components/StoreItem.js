function StoreItem({ item, addItemToCart }) {
  return (
    <li>
      <div className="store--item-icon">
        <img src={`assets/icons/${item.id}.svg`} alt={item.name} />
      </div>
      <button onClick={() => addItemToCart(item)}>Add to cart</button>
    </li>
  );
}

export default StoreItem;
