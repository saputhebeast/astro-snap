import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from "@/components/layout/Header.jsx";

const EducationalNews = () => {
    const [images, setImages] = useState([]);

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const response = await axios.get('https://images-api.nasa.gov/search', {
                    params: {
                        q: 'education',
                        media_type: 'image',
                    },
                });
                const sortedImages = response.data.collection.items.sort((a, b) => {
                    return new Date(b.data[0].date_created) - new Date(a.data[0].date_created);
                });
                setImages(sortedImages);
            } catch (error) {
                console.error("Error fetching educational resources:", error);
            }
        };

        fetchImages();
    }, []);

    // Helper function to format the date
    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    return (
        <>
            <Header />
            <div className="max-w-4xl mx-auto p-4 mt-8 rounded-lg">
                <h1 className="text-2xl font-bold text-center mb-4">Educational News</h1>
                <p>Stay informed with the latest educational news and resources from NASA. Discover images, videos, and articles on space exploration, astronomy, and more.</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {images.map((image, index) => (
                        <div key={index} className="rounded overflow-hidden shadow-lg">
                            <img src={image.links[0].href} alt={image.data[0].title} className="w-full"/>
                            <div className="px-6 py-4">
                                <div className="font-bold text-xl mb-2">{image.data[0].title}</div>
                                <p className="text-gray-700 text-base">
                                    {image.data[0].description}
                                </p>
                                <p className="text-gray-600 text-sm">
                                    Created: {formatDate(image.data[0].date_created)}
                                </p>
                                {image.data[0].photographer && (
                                    <p className="text-gray-600 text-sm">
                                        Photographer: {image.data[0].photographer}
                                    </p>
                                )}
                                {image.data[0].keywords && (
                                    <p className="text-gray-600 text-sm">
                                        Keywords: {image.data[0].keywords.join(', ')}
                                    </p>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default EducationalNews;
