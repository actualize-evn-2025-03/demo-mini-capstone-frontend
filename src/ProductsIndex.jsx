import { useState } from "react";

export function ProductsIndex({ products, onShow, onAddToCart }) {
  const [searchFilter, setSearchFilter] = useState("");
  const [sortOption, setSortOption] = useState("");

  return (
    <div>
      <h1>All products ({products.length} total)</h1>
      Search Filter: <input type="text" value={searchFilter} onChange={(event) => setSearchFilter(event.target.value)} list="names" />
      <datalist id="names">
        {products.map((product) => (
          <option key={product.id} value={product.name} />
        ))}
      </datalist>
      
      Sort by: 
      <select value={sortOption} onChange={(event) => setSortOption(event.target.value)}>
        <option value="">No Sort</option>
        <option value="a-z">A-Z</option>
        <option value="z-a">Z-A</option>
      </select>
      {products
        .filter((product) => product.name.toLowerCase().includes(searchFilter.toLowerCase()))
        // .sort() takes two items (a, b) and asks: "Which should come first?"
        // JavaScript calls this function many times until the whole array is sorted [1, 2, 3, 4, 5]
        .sort((a, b) => {
          if (sortOption === "a-z") {
            // localeCompare() compares two strings alphabetically
            // Returns: negative (a first), positive (b first), or 0 (same)
            return a.name.localeCompare(b.name);
          } else if (sortOption === "z-a") {
            // Flip the comparison to reverse the order (Z to A)
            return b.name.localeCompare(a.name);
          }
          return 0; // no sorting - keep original order
        })
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
