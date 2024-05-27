// src/components/ProductList.js
// src/components/ProductList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://dummyjson.com/products');
        setProducts(response.data.products);
        setFilteredProducts(response.data.products);
        
      } catch (error) {
        console.error('Error fetching the products', error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    setFilteredProducts(
      products.filter(product =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, products]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className='flex flex-col justify-center items-center gap-6'>
      <h1>Product List</h1>
      <input
        type="text"
        placeholder="Search products..."
        value={searchTerm}
        onChange={handleSearch}
        className=' w-[30%] h-10 focus:bg-slate-300 rounded-full p-5'
        
      />
      <div className=' scrollbar-hide flex flex-col gap-10 w-[90%] bg-slate-600 rounded-lg  h-[80vh] overflow-y-scroll  '>
        {filteredProducts.map(product => (
          <div key={product.id} className='flex flex-col gap-3 bg-white rounded-lg p-5'>
            <img src={product.images} alt='loading' width={200} className=''/>
            <h1><strong>{product.title}</strong></h1>
            <p><strong>Price:</strong> ${product.price}</p>

            <p>{product.description}</p>
            
           
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
