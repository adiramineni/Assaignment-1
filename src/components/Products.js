import React, { useState, useEffect } from 'react';

const Products = () => {
  const [id, setId] = useState('');
  const [price, setPrice] = useState('');
  const [Name, setName] = useState('');
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const storedProducts = JSON.parse(localStorage.getItem('products')) || [];
    setProducts(storedProducts);
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (id && price && Name) {
      const newProduct = {
        id,
        price,
        Name,
      };
      const updatedProducts = [...products, newProduct];
      localStorage.setItem('products', JSON.stringify(updatedProducts));
      setProducts(updatedProducts);
      setId('');
      setPrice('');
      setName('');
    }
  };

  const handleDelete = (productId) => {
    const updatedProducts = products.filter((product) => product.id !== productId);
    localStorage.setItem('products', JSON.stringify(updatedProducts));
    setProducts(updatedProducts);
  };

  const calculateTotalValue = () => {
    const totalValue = products.reduce((acc, product) => acc + parseFloat(product.price), 0);
    return totalValue.toFixed(2); 
  };
  

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="id">Product ID:</label>
        <input type="number" id="id" name="id" required value={id} onChange={(e) => setId(e.target.value)} />

        <label htmlFor="price">Selling Price:</label>
        <input type="number" id="price" name="price" required value={price} onChange={(e) => setPrice(e.target.value)} />

        <label htmlFor="Name">Product Name:</label>
        <input type="text" id="Name" name="Name" required value={Name} onChange={(e) => setName(e.target.value)} />


        <input type="submit" value="Add Product" />
      </form>

      <h1>Products</h1>

      <ul>
        {products.map((product) => {
            return (
              <li key={product.id}>
                ID: {product.id} - Rs{product.price} - {product.Name}
                <button className="delete-btn" onClick={() => handleDelete(product.id)}>
                  Delete Product
                </button>
              </li>
            );
          }
        )};
      </ul>

      <h3>Total Value Worth Products: Rs.{calculateTotalValue()} </h3>
      

    </div>
  );
};

export default Products;