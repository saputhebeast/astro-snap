import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from "@/components/layout/Header.jsx";

const MarsRoverPhotoGallery = () => {
    const [photos, setPhotos] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos', {
                    params: {
                        sol: 1000,
                        page: currentPage,
                        api_key: 'dzwn3dmvsoVYHJFBoTyPFVgy2AaStJps1MxEG8R6',
                    },
                });
                setPhotos(response.data.photos);
            } catch (error) {
                console.error("Error fetching Mars rover photos:", error);
            }
        };

        fetchData();
    }, [currentPage]);

    const handlePrevPage = () => {
        setCurrentPage(prev => prev > 1 ? prev - 1 : 1);
    };

    const handleNextPage = () => {
        setCurrentPage(prev => prev + 1);
    };

    return (
        <>
            <Header/>
            <div className="max-w-4xl mx-auto p-4 mt-8 rounded-lg">
                <h1 className="text-2xl font-bold text-center mb-4">Mars Rover Photo Gallery</h1>
                <p>A section dedicated to Mars exploration, featuring images from the Curiosity Mars rover.</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {photos.map(photo => (
                        <div key={photo.id} className="max-w-sm rounded overflow-hidden shadow-lg">
                            <img className="w-full" src={photo.img_src} alt={`Mars Rover: ${photo.camera.full_name}`}/>
                            <div className="px-6 py-4">
                                <div className="font-bold text-xl mb-2">Sol {photo.sol}</div>
                                <p className="text-gray-700 text-base">
                                    Camera: {photo.camera.full_name}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="flex justify-center mt-8">
                    <button onClick={handlePrevPage}
                            className="mx-2 px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">Previous
                    </button>
                    <button onClick={handleNextPage}
                            className="mx-2 px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">Next
                    </button>
                </div>
            </div>
        </>
    );
};

export default MarsRoverPhotoGallery;
