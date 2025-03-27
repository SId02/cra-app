
import React, { useState, useEffect, useMemo } from 'react';

import { Link } from 'react-router-dom';
interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
}

const ProductListSearchSortFilter: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [sortOption, setSortOption] = useState<string>('id');
  const [filterCategory, setFilterCategory] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch('https://dummyjson.com/products');
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setProducts(data.products);
      } catch (e: any) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = useMemo(() => {
    let filtered = products;

    if (searchTerm) {
      const lowerSearchTerm = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (product) =>
          product.title.toLowerCase().includes(lowerSearchTerm) ||
          product.description.toLowerCase().includes(lowerSearchTerm)
      );
    }
    if (filterCategory) {
      filtered = filtered.filter((product) => product.category === filterCategory);
    }
    return filtered;
  }, [products, searchTerm, filterCategory]);

  const sortedProducts = useMemo(() => {
    const sorted = [...filteredProducts];

    sorted.sort((a, b) => {
      if (sortOption === 'price') {
        return a.price - b.price;
      } else if (sortOption === 'rating') {
        return b.rating - a.rating;
      }

      return a.id - b.id;
    });

    return sorted;
  }, [filteredProducts, sortOption]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOption(event.target.value);
  };

  const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterCategory(event.target.value);
  };

  if (loading) {
    return <p className="p-4">Loading products...</p>;
  }

  if (error) {
    return <p className="p-4 text-red-500">Error: {error}</p>;
  }

  return (
    <>
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Product List</h1>
      <div className="flex flex-col md:flex-row gap-4 mb-4">
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700">Search:</label>
          <input
            type="text"
            placeholder="Search products"
            value={searchTerm}
            onChange={handleSearchChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
        <div className="md:w-1/4">
          <label className="block text-sm font-medium text-gray-700">Sort by:</label>
          <select
            value={sortOption}
            onChange={handleSortChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option value="id">ID</option>
            <option value="price">Price</option>
            <option value="rating">Rating</option>
          </select>
        </div>
        <div className="md:w-1/4">
          <label className="block text-sm font-medium text-gray-700">Filter by Category:</label>
          <select
            value={filterCategory}
            onChange={handleCategoryChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option value="">All Categories</option>
            {[...new Set(products.map((product) => product.category))].map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>   
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {sortedProducts.map((product) => (
          <div key={product.id} className="border rounded-md shadow-md">
            <div className="aspect-w-4 aspect-h-3">
              <img src={product.thumbnail} alt={product.title} className="object-cover w-full h-full rounded-t-md" />
            </div>
            <div className="p-4">
              <h2 className="text-lg font-semibold">{product.title}</h2>
              <p className="text-sm text-gray-600">{product.brand}</p>
              <p className="mt-2 text-sm">{product.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
    <footer className="flex justify-center mt-4">
      <Link to="/" className="text-blue-500 hover:underline">
          Back to Home
      </Link>
  </footer>
    </>
  );
};
export default ProductListSearchSortFilter;



