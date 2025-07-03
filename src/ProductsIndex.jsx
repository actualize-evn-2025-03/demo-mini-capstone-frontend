  export function ProductsIndex({ products }) {
    return (
      <div>
        <h1>All products ({products.length} total)</h1>
        {products.map((product) => (
          <div key={product.id}>
            <h2>{product.name}</h2>
            <img src={product.primary_image_url} />
            <p>Price: ${product.price}</p>
            <p>Description: {product.description}</p>
          </div>
        ))}
      </div>
    );
  }
  