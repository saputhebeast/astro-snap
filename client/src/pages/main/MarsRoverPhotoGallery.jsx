import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from "@/components/layout/Header.jsx";

const MarsRoverPhotoGallery = () => {
    const [photos, setPhotos] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [hoveredPhoto, setHoveredPhoto] = useState(null);

    const ITEMS_PER_PAGE = 16;

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
                const fetchedPhotos = response.data.photos;
                setPhotos(fetchedPhotos);
                setTotalPages(Math.ceil(fetchedPhotos.length / ITEMS_PER_PAGE));
            } catch (error) {
                console.error("Error fetching Mars rover photos:", error);
            }
        };

        fetchData();
    }, [currentPage]);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handleMouseEnter = (photo) => {
        setHoveredPhoto(photo);
    };

    const handleMouseLeave = () => {
        setHoveredPhoto(null);
    };

    return (
        <>
            <Header/>
            <div className="max-w-4xl mx-auto p-4 mt-8 rounded-lg">
                <h1 className="text-3xl font-bold text-center mb-4">Mars Rover Photo Gallery</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {photos.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE).map(photo => (
                        <div 
                            key={photo.id} 
                            className="relative rounded-lg overflow-hidden shadow-lg"
                            onMouseEnter={() => handleMouseEnter(photo)}
                            onMouseLeave={handleMouseLeave}
                        >
                            <img className="w-full h-64 object-cover" src={photo.img_src} alt={`Mars Rover: ${photo.camera.full_name}`}/>
                            {hoveredPhoto === photo && (
                                <div className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-50 transition-opacity duration-300 hover:bg-opacity-70">
                                    <div className="text-center text-white">
                                        <p className="font-bold">{photo.camera.full_name}</p>
                                        <p>{photo.earth_date}</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
                <div className="flex justify-center mt-8">
                    {Array.from({ length: totalPages }, (_, i) => (
                        <button 
                            key={i + 1} 
                            onClick={() => handlePageChange(i + 1)}
                            className={`mx-2 px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 ${currentPage === i + 1 ? 'bg-gray-500' : ''}`}
                        >
                            {i + 1}
                        </button>
                    ))}
                </div>
            </div>
        </>
    );
};

export default MarsRoverPhotoGallery;
