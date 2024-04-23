import React from 'react';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { app } from '@/helpers/firebase';
import { useState } from 'react';

const NewPostModal = ({ onClose, newPost, setNewPost, onSubmit }) => {
    const [isUploading, setIsUploading] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewPost(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (!file) {
            return;
        }
        setIsUploading(true);
        const storage = getStorage(app);
        const storageRef = ref(storage, `posts/${file.name}_${new Date().toISOString()}`);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on('state_changed', 
            (snapshot) => {
                // Handle progress
            }, 
            (error) => {
                console.error(error);
                setIsUploading(false);
            }, 
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    console.log('File available at', downloadURL);
                    setNewPost(prevState => ({
                        ...prevState,
                        photo_url: downloadURL
                    }));
                    setIsUploading(false);
                });
            }
        );
    };

    const handlePost = () => {
        onSubmit(newPost);
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full" id="my-modal">
            <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
                <div className="mt-3 text-center">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">Add New Post</h3>
                    <div className="mt-2 px-7 py-3">
                        <input
                            type="file"
                            onChange={handleImageChange}
                            required
                            className="mb-4 mt-2 appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                        />
                        <textarea
                            name="caption"
                            value={newPost.caption}
                            onChange={handleInputChange}
                            placeholder="Caption"
                            required
                            className="mb-4 appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                        ></textarea>
                        <div className="items-center px-4 py-3">
                            <button 
                                onClick={handlePost} 
                                disabled={isUploading}
                                className="px-4 py-2 bg-blue-500 hover:bg-blue-700 rounded-lg text-white text-sm font-medium disabled:bg-blue-300"
                            >
                                Post
                            </button>
                            <button onClick={onClose} type="button" className="mx-4 px-4 py-2 bg-red-500 hover:bg-red-700 rounded-lg text-white text-sm font-medium">
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NewPostModal;
