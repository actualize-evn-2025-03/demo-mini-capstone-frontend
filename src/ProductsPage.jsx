import axios from "axios";
import { useState, useEffect } from "react";
import { ProductsIndex } from "./ProductsIndex";
import { ProductsNew } from "./ProductsNew";
import { Modal } from "./Modal";
import { ProductsShow } from "./ProductsShow";

export function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [isProductsShowVisible, setIsProductsShowVisibile] = useState(false);
  const [currentProduct, setCurrentProduct] = useState({});

  const handleIndex = () => {
    console.log("handleIndex");
    axios.get("http://localhost:3000/products.json").then((response) => {
      console.log(response.data);
      setProducts(response.data);
    });
  };

  const handleCreate = (params, successCallback) => {
    console.log("handleCreate");
    axios.post("http://localhost:3000/products.json", params)
      .then((response) => {
        setProducts([...products, response.data]);
        successCallback();
      })
  }

  const handleShow = (product) => {
    console.log("handleShow", product);
    setIsProductsShowVisibile(true);
    setCurrentProduct(product);
  }

  useEffect(handleIndex, []);

  return (
    <main>
      <ProductsNew onCreate={handleCreate} />
      <ProductsIndex products={products} onShow={handleShow} />
      <Modal show={isProductsShowVisible} onClose={() => setIsProductsShowVisibile} >
        <ProductsShow product={currentProduct} />
      </Modal>
    </main>
  );
}
