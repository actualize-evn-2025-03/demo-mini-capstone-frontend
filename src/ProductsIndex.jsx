import { useState } from "react";

export function ProductsIndex({ products, onShow, onAddToCart }) {
  const [searchFilter, setSearchFilter] = useState("");

  return (
    <div>
      <h1>All products ({products.length} total)</h1>
      Search Filter: <input type="text" value={searchFilter} onChange={(event) => setSearchFilter(event.target.value)} />
      {products
        .filter((product) => product.name.toLowerCase().includes(searchFilter.toLowerCase()))
        .map((product) => (
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
