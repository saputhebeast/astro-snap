import React, { useState, useEffect } from 'react';
import Header from "@/components/layout/Header.jsx";
import Post from "@/components/common/Post.jsx";
import NewPostModal from "@/components/common/NewPostModal.jsx";
import { useSelector } from 'react-redux';
import { addNewPost, fetchPosts, likePost } from "@/services/diary.js";
import { MutatingDots } from 'react-loader-spinner';

const SkyWatchingDiaries = () => {
    const [posts, setPosts] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [newPost, setNewPost] = useState({ photo_url: '', caption: '' });
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');

    const currentUser = useSelector(state => state.user.authUser);
    const currentUserId = currentUser._id;

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (currentUser && token) {
            fetchData(token);
        }
    }, [currentUser]);

    const fetchData = async (token) => {
        setIsLoading(true);
        try {
            const fetchedPosts = await fetchPosts(token);
            const postsWithLikeStatus = fetchedPosts.map(post => ({
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

    const handleLike = async (postId) => {
        try {
            const token = localStorage.getItem('token');
            const updatedPost = await likePost(postId, token);
            setPosts((currentPosts) => currentPosts.map(post =>
                post._id === postId ? {
                    ...post,
                    likes_count: updatedPost.likes_count,
                    isLiked: updatedPost.likes.some(like => like._id === currentUserId),
                } : post
            ));
        } catch (error) {
            console.error("Error liking post:", error);
        }
    };

    const handleBookmark = (id) => {
        setPosts(posts.map(post => {
            if (post._id === id) {
                return {
                    ...post,
                    isBookmarked: !post.isBookmarked
                };
            }
            return post;
        }));
    };

    const handleSubmitNewPost = async () => {
        try {
            const token = localStorage.getItem('token');
            await addNewPost(newPost, token);
            await fetchData(token);
            setShowModal(false);
            setNewPost({ photo_url: '', caption: '' });
        } catch (error) {
            console.error("Error adding new post:", error);
        }
    };

    if (isLoading) {
        return (
            <div style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'rgba(0, 0, 0, 0.1)',
                zIndex: 9999
            }}>
                <MutatingDots
                    height="100"
                    width="100"
                    color="#4fa94d"
                    secondaryColor="#4fa94d"
                    radius="12.5"
                    ariaLabel="mutating-dots-loading"
                    wrapperClass="flex justify-center items-center"
                    visible={true}
                />
            </div>
        );
    }

    return (
        <>
            <Header />
            <div className="container mx-auto p-8">
                <h1 className="text-3xl font-bold text-center mb-8">Skywatching Diaries</h1>
                {error ? (
                    <div className="text-red-500">{error}</div>
                ) : posts.length > 0 ? (
                    posts.map(post => (
                        <div key={post._id} className="max-w-xl mx-auto">
                            <Post post={post} onLike={() => handleLike(post._id)} onBookmark={() => handleBookmark(post._id)} />
                        </div>
                    ))
                ) : (
                    <div className="text-center">No posts available. Be the first to post!</div>
                )}
                <div className="fixed bottom-8 right-8">
                    <button onClick={() => setShowModal(true)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        Add New Skywatching Diary
                    </button>
                </div>
                {showModal && (
                    <NewPostModal
                        onClose={() => setShowModal(false)}
                        onSubmit={handleSubmitNewPost}
                        newPost={newPost}
                        setNewPost={setNewPost}
                    />
                )}
            </div>
        </>
    );
};

export default SkyWatchingDiaries;
