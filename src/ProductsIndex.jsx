export function ProductsIndex({ products, onShow, onAddToCart }) {
  return (
    <div>
      <h1>All products ({products.length} total)</h1>
      {products.map((product) => (
        <div key={product.id}>
          <h2>{product.name}</h2>
          <img src={product.primary_image_url} />
          <p>Price: ${product.price}</p>
          <p>Description: {product.description}</p>
          <button onClick={() => onShow(product)}>More info</button>
          <button onClick={() => onAddToCart(product)}>Add to Cart</button>
        </div>
      ))}
    </div>
  );
}
