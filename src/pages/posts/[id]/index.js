import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const Post = () => {
    const router = useRouter();
    const [postDetail, setPostDetail] = useState();
    const [authorDetail, setAuthorDetail] = useState();

    useEffect(() => {
        const id = router.query.id;

        // Post Detail
        async function getPostById(id) {
            try {
                const data = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
                const postData = await data.json();
                setPostDetail(postData);

                const authorId = postData.userId;
                getAuthorById(authorId);
            } catch (error) {
                console.error("Error fetching post:", error);
            }
        }

        // Author Detail
        async function getAuthorById(authorId) {
            try {
                const data = await fetch(`https://jsonplaceholder.typicode.com/users/${authorId}`);
                const authorData = await data.json();
                setAuthorDetail(authorData);
                console.log(authorDetail, "author");
            } catch (error) {
                console.error("Error fetching author:", error);
            }
        }

        getPostById(id);
    }, [router.query.id]);

    if (!postDetail || !authorDetail) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            <h1>Author: {authorDetail.name}</h1>
            <h2>Post Title: {postDetail.title}</h2>
            <p><b>Post Body:</b> {postDetail.body}</p>
        </div>
    );
};

export default Post;
