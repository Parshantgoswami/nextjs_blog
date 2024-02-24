"use client"
import { useEffect, useState } from "react";
import Link from 'next/link';

const Posts = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
        if (response.ok) {
          const data = await response.json();
          setPosts(data);
        } else {
          console.error(`Error: Unable to fetch data. Status code: ${response.status}`);
        }
      } catch (error) {
        console.error(`Error: ${error.message}`);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="container mt-5">
      <h1 className="bg-primary text-white p-3">Posts</h1>
      <div className="row">
        {posts?.map((post) => (
          <div key={post.id} className="col-lg-3 col-md-4 col-sm-12 mb-3">
            <div className="h-100 bg-success p-3 shadow">
              <Link href={`/posts/${post.id}`} className="text-white">
                <div>{post.title}</div>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Posts;
