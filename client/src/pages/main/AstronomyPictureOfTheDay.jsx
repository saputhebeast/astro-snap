import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from "@/components/layout/Header.jsx";

const AstronomyPictureOfTheDay = () => {
    const [apod, setApod] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get('https://api.nasa.gov/planetary/apod?api_key=dzwn3dmvsoVYHJFBoTyPFVgy2AaStJps1MxEG8R6');
            setApod(response.data);
        };

        fetchData().catch(console.error);
    }, []);

    return (
        <>
            <Header/>
            <div className="max-w-4xl mx-auto p-4 mt-8 rounded-lg">
                <h1 className="text-2xl font-bold text-center mb-4">Astronomy Picture of the Day</h1>
                <p>Discover the cosmos! Each day a different image or photograph of our fascinating universe is featured, along with a brief explanation written by a professional astronomer.</p>
                <div className="flex flex-col items-center min-h-screen py-8">
                    {apod && (
                        <div className="max-w-4xl pl-5 pr-5">
                            <h2 className="text-xl md:text-xl font-bold mb-3">{apod.title}</h2>
                            <img src={apod.url} alt={apod.title} className="w-full rounded-lg shadow-lg mb-4"/>
                            <p className="text-sm md:text-base p-3 rounded mb-2">Date: {apod.date}</p>
                            <p className="text-sm md:text-base p-3 rounded">{apod.explanation}</p>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default AstronomyPictureOfTheDay;
