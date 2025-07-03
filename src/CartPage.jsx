import { useOutletContext, Link } from "react-router-dom";

export function CartPage() {
  const { cartItems, onRemoveFromCart } = useOutletContext();

  return (
    <main>
      <h1>Your Shopping Cart</h1>
      
      <p>You have {cartItems.length} items in your cart</p>
      
      {cartItems.map((cartItem) => (
        <div key={cartItem.id}>
          <h3>{cartItem.product.name}</h3>
          <p>Price: ${cartItem.product.price}</p>
          <p>Quantity: {cartItem.quantity}</p>
          <button onClick={() => onRemoveFromCart(cartItem)}>Remove from Cart</button>
        </div>
      ))}
      
      <p><Link to="/">Back to Products</Link></p>
    </main>
  );
} 