
import React, { useState, useEffect } from 'react';
import Posts from '../Layout/Posts/Posts';
import Paginate from '../Layout/Paginates/Paginate';
import axios from 'axios';
const Pagination = () => {
     

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      const res = await axios.get('https://jsonplaceholder.typicode.com/posts');
      setPosts(res.data);
      setLoading(false);
    };

    fetchPosts();
  }, []);

  // Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  // Change page
  const paginate = pageNumber => setCurrentPage(pageNumber);
    return (
        <div>
            <div className='container mt-5'>
      <h1 className='text-primary mb-3'>My Blog</h1>
      <Posts posts={currentPosts} loading={loading} />
      <Paginate
        postsPerPage={postsPerPage}
        totalPosts={posts.length}
        paginate={paginate}
      />
    </div>
        </div>
    )
}
export default Pagination;
