import React, { useState, useEffect } from 'react';
import Header from "@/components/layout/Header.jsx";
import { fetchApodData } from "@/services/apod.js";
import { MutatingDots } from 'react-loader-spinner';

const AstronomyPictureOfTheDay = () => {
    const [apod, setApod] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchApodData();
                setApod(data);
            } catch (error) {
                console.error('Error fetching APOD data:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    if (isLoading) {
        return (
            <div style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundColor: 'rgba(0, 0, 0, 0.1)',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                backdropFilter: 'blur(8px)',
                zIndex: 50
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
            <div className="max-w-4xl mx-auto px-4 mt-8 rounded-lg">
                <h1 className="text-2xl font-bold text-center mb-4">Astronomy Picture of the Day</h1>
                <p>Discover the cosmos! Each day a different image or photograph of our fascinating universe is featured, along with a brief explanation written by a professional astronomer.</p>
                <div className="flex flex-col items-center min-h-screen py-8">
                    {apod && (
                        <div className="max-w-4xl px-5">
                            <h2 className="text-xl md:text-2xl font-bold mb-3">{apod.title}</h2>
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
