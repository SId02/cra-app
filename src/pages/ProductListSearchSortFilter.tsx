import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router';

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  rating: number;
  category: string;
  brand?: string;
  thumbnail: string;
}

const ProductListSearchSortFilter: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [sortOption, setSortOption] = useState<string>("id");
  const [filterCategory, setFilterCategory] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Pagination states
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 8;

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch("https://dummyjson.com/products?limit=100");
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

  // Reset to page 1 whenever filters or search terms change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, filterCategory, sortOption]);

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
      filtered = filtered.filter(
        (product) => product.category === filterCategory
      );
    }
    return filtered;
  }, [products, searchTerm, filterCategory]);

  const sortedProducts = useMemo(() => {
    const sorted = [...filteredProducts];

    sorted.sort((a, b) => {
      if (sortOption === "price") {
        return a.price - b.price;
      } else if (sortOption === "rating") {
        return b.rating - a.rating;
      }
      return a.id - b.id;
    });

    return sorted;
  }, [filteredProducts, sortOption]);

  // Pagination Logic
  const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);
  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return sortedProducts.slice(start, start + itemsPerPage);
  }, [sortedProducts, currentPage]);

  const categories = useMemo(() => {
    return [...new Set(products.map((product) => product.category))];
  }, [products]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(event.target.value);
  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => setSortOption(event.target.value);
  const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => setFilterCategory(event.target.value);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col justify-between transition-colors">
      <section className="py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-semibold uppercase tracking-widest text-indigo-600 dark:text-indigo-400 mb-2 block">
            Catalog Showcase
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Product Catalog
          </h1>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
            Search, sort, and filter through items seamlessly with pagination support.
          </p>
        </div>

        {/* Filter & Controls Container Card */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 mb-8 transition-colors">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            {/* Search Input */}
            <div className="md:col-span-6">
              <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                Search Products
              </label>
              <input
                className="w-full px-4 py-2.5 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl text-sm text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition"
                type="text"
                placeholder="Search by title or description..."
                value={searchTerm}
                onChange={handleSearchChange}
              />
            </div>

            {/* Sort Select */}
            <div className="md:col-span-3">
              <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                Sort by
              </label>
              <div className="relative">
                <select
                  className="w-full px-4 py-2.5 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl text-sm text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition appearance-none cursor-pointer"
                  value={sortOption}
                  onChange={handleSortChange}
                >
                  <option value="id">Default ID</option>
                  <option value="price">Price (Low to High)</option>
                  <option value="rating">Rating (High to Low)</option>
                </select>
                <div className="absolute right-3 top-3 pointer-events-none text-slate-400 text-xs">
                  <i className="fa-solid fa-chevron-down"></i>
                </div>
              </div>
            </div>

            {/* Category Filter */}
            <div className="md:col-span-3">
              <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                Category Filter
              </label>
              <div className="relative">
                <select
                  className="w-full px-4 py-2.5 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl text-sm text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition appearance-none cursor-pointer"
                  value={filterCategory}
                  onChange={handleCategoryChange}
                >
                  <option value="">All Categories</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </option>
                  ))}
                </select>
                <div className="absolute right-3 top-3 pointer-events-none text-slate-400 text-xs">
                  <i className="fa-solid fa-chevron-down"></i>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* States: Loading & Error */}
        {loading && (
          <div className="text-center py-16">
            <p className="text-slate-500 dark:text-slate-400 font-medium animate-pulse">
              Loading products...
            </p>
          </div>
        )}

        {error && (
          <div className="mb-6 p-4 rounded-xl bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 text-xs font-medium text-center">
            Error: {error}
          </div>
        )}

        {/* Product List Grid */}
        {!loading && !error && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {paginatedProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-lg hover:shadow-xl hover:border-indigo-500 dark:hover:border-indigo-500 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="w-full h-48 bg-slate-100 dark:bg-slate-800 rounded-xl overflow-hidden mb-4">
                    <img
                      src={product.thumbnail}
                      alt={product.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  <div className="flex justify-between items-center mb-2">
                    <span className="px-2.5 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 text-xs font-semibold uppercase">
                      {product.brand || product.category}
                    </span>
                    <span className="font-bold text-emerald-600 dark:text-emerald-400 text-base">
                      ${product.price}
                    </span>
                  </div>

                  <h3 className="font-bold text-slate-900 dark:text-white text-base mb-1 line-clamp-1">
                    {product.title}
                  </h3>

                  <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 mb-4 leading-relaxed">
                    {product.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center text-xs">
                  <span className="font-semibold text-amber-500">
                    <i className="fa-solid fa-star mr-1"></i> {product.rating} / 5
                  </span>
                  <span className="text-slate-400 font-mono">ID: {product.id}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && sortedProducts.length === 0 && !error && (
          <div className="text-center py-16">
            <p className="text-slate-500 dark:text-slate-400">
              No products found matching your search criteria.
            </p>
          </div>
        )}

        {/* Pagination Controls */}
        {!loading && totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-10">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-xs font-medium hover:bg-slate-50 dark:hover:bg-slate-800 disabled:opacity-40 transition cursor-pointer"
            >
              Previous
            </button>

            <span className="text-xs font-semibold text-slate-600 dark:text-slate-400 px-3">
              Page {currentPage} of {totalPages}
            </span>

            <button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-4 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-xs font-medium hover:bg-slate-50 dark:hover:bg-slate-800 disabled:opacity-40 transition cursor-pointer"
            >
              Next
            </button>
          </div>
        )}
      </section>

      {/* Footer */}
      <footer className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 py-6 text-center transition-colors">
        <Link
          to="/"
          className="text-indigo-600 dark:text-indigo-400 font-semibold text-sm hover:underline inline-flex items-center gap-2"
        >
          <i className="fa-solid fa-arrow-left text-xs"></i> Back to Home
        </Link>
      </footer>
    </div>
  );
};

export default ProductListSearchSortFilter;