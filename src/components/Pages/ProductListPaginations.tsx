import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

interface Product {
  id: number;
  title: string;
  body: string;
}

const ProductListPaginations: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const productsPerPage: number = 10;

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://jsonplaceholder.typicode.com/posts?_limit=${productsPerPage}&_page=${currentPage}`
        );
        const data = await response.json() as Product[];
        setProducts(data);
        const totalProducts = 100;
        const totalPages = Math.ceil(totalProducts / productsPerPage);
        setTotalPages(totalPages);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [currentPage]);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const renderPaginationButtons = () => {
    const pageNumbers: number[] = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }

    return (
      <nav className="flex justify-center" aria-label="pagination">
        <ul className="flex space-x-2">
          {pageNumbers.map((number) => (
            <li key={number}>
              <button
                className={`px-4 py-2 border rounded-lg ${currentPage === number ? 'bg-blue-500 text-white' : 'bg-white text-blue-500'}`}
                aria-label={`Go to page ${number}`}
                onClick={() => handlePageChange(number)}
              >
                {number}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    );
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <div className="container mx-auto p-4  ">
        <h1 className="text-2xl font-bold mb-4">Product List</h1>
        <div className="grid grid-cols-3 gap-4">
          {products.map((product) => (
            <div className="border rounded-lg p-4" key={product.id}>
              <h2 className="text-lg font-semibold">{product.title}</h2>
              
            <p>{product.body}</p>
            </div>
          ))}
        </div>
        {renderPaginationButtons()}
      </div>
      <footer className="flex justify-center mt-4">
        <Link to="/" className="text-blue-500 hover:underline">
          Back to Home
        </Link>
      </footer>
    </>
  );  
};

export default ProductListPaginations;
