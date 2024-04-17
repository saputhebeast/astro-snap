import React, { useEffect, useState } from 'react';
import Header from "@/components/layout/Header.jsx";
import axios from "axios";
import Post from "@/components/common/Post.jsx";
import NewPostModal from "@/components/common/NewPostModal.jsx";
import { useSelector } from 'react-redux';

const SkywatchingDiaries = () => {
    const [posts, setPosts] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [newPost, setNewPost] = useState({ photo_url: '', caption: '' });
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');

    const currentUser = useSelector(state => state.user.authUser);
    const currentUserId =  currentUser._id;

    const fetchPosts = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get('http://localhost:8085/api/v1/post', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            const postsWithLikeStatus = response.data.data.map(post => ({
                ...post,
                isLiked: post.likes.some(like => like._id === currentUserId),
            }));
            setPosts(postsWithLikeStatus);
            setError('');
        } catch (error) {
            console.error("Error fetching posts:", error);
            setError("Failed to fetch posts. Please try again later.");
        } finally {
            setIsLoading(false);
        }
    };


    useEffect(() => {
        if (currentUser) {
            fetchPosts();
        }
    }, [currentUser]);

    const handleLike = async (postId) => {
        try {
            const response = await axios.post(`http://localhost:8085/api/v1/post/${postId}/like`, {}, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });

            if (response.data && response.data.data) {
                const updatedPost = response.data.data;
                setPosts((currentPosts) => currentPosts.map(post =>
                    post._id === postId ? {
                        ...post,
                        likes_count: updatedPost.likes_count,
                        isLiked: updatedPost.likes.some(like => like._id === currentUserId),
                    } : post
                ));
            }
        } catch (error) {
            console.error("Error liking post:", error);
        }
    };

    const handleBookmark = (id) => {
        setPosts(posts.map(post => {
            if (post.id === id) {
                return {
                    ...post,
                    isBookmarked: !post.isBookmarked
                };
            }
            return post;
        }));
    };

    const addNewPost = async (e) => {
        e.preventDefault();
        try {
            const postData = {
                photo_url: newPost.photo_url,
                caption: newPost.caption
            };
            await axios.post('http://localhost:8085/api/v1/post', postData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            await fetchPosts();
            setShowModal(false);
            setNewPost({ photo_url: '', caption: '' });
        } catch (e) {
            console.error("Error adding new post:", e);
        }
    };

    return (
        <>
            <Header />
            <div className="max-w-4xl mx-auto p-4 mt-8 rounded-lg">
                <h1 className="text-2xl font-bold text-center mb-4">Skywatching Diaries</h1>
                <button onClick={() => setShowModal(true)} className="mb-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Add New Post
                </button>
                {isLoading ? (
                    <div>Loading posts...</div>
                ) : error ? (
                    <div className="text-red-500">{error}</div>
                ) : posts.length > 0 ? (
                    posts.map(post => (
                        <Post key={post._id} post={post} onLike={() => handleLike(post._id)} onBookmark={handleBookmark} />
                    ))
                ) : (
                    <div>No posts available. Be the first to post!</div>
                )}
                {showModal && (
                    <NewPostModal
                        onClose={() => setShowModal(false)}
                        onSubmit={addNewPost}
                        newPost={newPost}
                        setNewPost={setNewPost}
                    />
                )}
            </div>
        </>
    );
};

export default SkywatchingDiaries;
