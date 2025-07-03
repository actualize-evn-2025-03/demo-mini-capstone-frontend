import axios from "axios";
import { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import { ProductsIndex } from "./ProductsIndex";
import { ProductsNew } from "./ProductsNew";
import { Modal } from "./Modal";
import { ProductsShow } from "./ProductsShow";

export function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [isProductsShowVisible, setIsProductsShowVisibile] = useState(false);
  const [currentProduct, setCurrentProduct] = useState({});
  
  // Get cart functions from the Layout context
  const { onAddToCart } = useOutletContext();

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
      <ProductsIndex products={products} onShow={handleShow} onAddToCart={onAddToCart} />
      <Modal show={isProductsShowVisible} onClose={() => setIsProductsShowVisibile(false)} >
        <ProductsShow product={currentProduct} />
      </Modal>
    </main>
  );
}
