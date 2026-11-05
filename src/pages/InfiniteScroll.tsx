import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router';

interface Post {
  id: number;
  title: string;
  body: string;
}

const USERS_PER_PAGE = 10;

export const InfiniteScroll: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [isGridLayout, setIsGridLayout] = useState<boolean>(true);

  const fetchPosts = useCallback(async (currentPage: number) => {
    if (loading) return;
    setLoading(true);

    try {
      const skip = (currentPage - 1) * USERS_PER_PAGE;
      const response = await fetch(
        `https://dummyjson.com/posts?limit=${USERS_PER_PAGE}&skip=${skip}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch posts");
      }

      const data = await response.json();

      setPosts((prevPosts) => {
        const existingIds = new Set(prevPosts.map((p) => p.id));
        const newPosts = data.posts.filter((p: Post) => !existingIds.has(p.id));
        return [...prevPosts, ...newPosts];
      });

      if (
        data.posts.length < USERS_PER_PAGE ||
        posts.length + data.posts.length >= data.total
      ) {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setLoading(false);
    }
  }, [loading, posts.length]);

  useEffect(() => {
    fetchPosts(page);
  }, [page, fetchPosts]);

  const handleScroll = useCallback(() => {
    if (
      window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 100 &&
      hasMore &&
      !loading
    ) {
      setPage((prevPage) => prevPage + 1);
    }
  }, [hasMore, loading]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const toggleLayout = () => {
    setIsGridLayout((prevState) => !prevState);
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      <section className="py-12 px-4 sm:px-6 lg:px-8 w-full">
        <div className="max-w-4xl mx-auto">
          {/* Header & Controls */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10">
            <div>
              <Link
                to="/"
                className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 hover:underline mb-2"
              >
                <i className="fa-solid fa-arrow-left"></i> Back to Home
              </Link>
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-2">
                Infinite Scroll Feed
              </h1>
              <p className="text-slate-600 dark:text-slate-400 text-sm">
                Scroll down continuously to load more records dynamically.
              </p>
            </div>
            <button
              onClick={toggleLayout}
              className="px-5 py-2.5 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 font-semibold text-sm hover:border-indigo-500 transition-all shadow-sm cursor-pointer"
            >
              <i className={`fa-solid ${isGridLayout ? 'fa-list-ul' : 'fa-grip'} mr-2 text-indigo-600 dark:text-indigo-400`}></i>
              {isGridLayout ? "Switch to List Layout" : "Switch to Grid Layout"}
            </button>
          </div>

          {/* Content Layouts */}
          {isGridLayout ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post) => (
                <div
                  key={post.id}
                  className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:border-indigo-500 hover:shadow-xl dark:hover:border-indigo-500 transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    <span className="inline-block px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 text-xs font-semibold mb-3">
                      #{post.id}
                    </span>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed line-clamp-4">
                      {post.body}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <ul className="space-y-4">
              {posts.map((post) => (
                <li key={post.id}>
                  <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:border-indigo-500 transition-all duration-300">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 text-xs font-semibold">
                        #{post.id}
                      </span>
                      <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                        {post.title}
                      </h3>
                    </div>
                    <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed pl-1">
                      {post.body}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          )}

          {/* Loading State Indicator */}
          {loading && (
            <div className="text-center py-8">
              <i className="fa-solid fa-spinner fa-spin text-3xl text-indigo-600"></i>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 font-medium">
                Loading more posts...
              </p>
            </div>
          )}

          {!hasMore && (
            <div className="text-center py-8">
              <p className="text-sm text-slate-400 font-medium">
                You've reached the end of the list!
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default InfiniteScroll;