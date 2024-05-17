import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import Header from "@/components/layout/Header.jsx";
import 'leaflet/dist/leaflet.css';
import { fetchIssLocation, fetchLocationDetails } from "@/services/iss-location.js";
import { MutatingDots } from 'react-loader-spinner';

const LiveSpaceMissionsTracker = () => {
    const [issLocation, setIssLocation] = useState([0, 0]);
    const [locationDetails, setLocationDetails] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    const fetchData = async () => {
        try {
            const { latitude, longitude } = await fetchIssLocation();
            setIssLocation([latitude, longitude]);
            const details = await fetchLocationDetails(latitude, longitude);
            setLocationDetails(details);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        const initialFetch = async () => {
            setIsLoading(true);
            await fetchData();
            setIsLoading(false);
        };

        initialFetch();

        const interval = setInterval(() => {
            fetchData();
        }, 5000);

        return () => clearInterval(interval);
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
            <div className="max-w-4xl mx-auto p-4 mt-8 rounded-lg">
                <h1 className="text-2xl font-bold text-center mb-4">Live Space Missions Tracker</h1>
                <p>Integrate live data on current space missions, including launches, spacewalks, and International Space Station (ISS) flyovers. Offer notifications for upcoming events.</p>
                <div className="relative" style={{ height: '500px' }}>
                    <MapContainer center={issLocation} zoom={3} style={{ height: '100%', width: '100%' }} className="rounded-lg">
                        <TileLayer
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        />
                        <Marker position={issLocation} />
                    </MapContainer>
                </div>
                <div className="text-gray-800 mt-4">
                    <h2 className="text-lg font-semibold">International Space Station (ISS) Current Location:</h2>
                    <p>Latitude: {issLocation[0]}</p>
                    <p>Longitude: {issLocation[1]}</p>
                    <p>Location Details: {locationDetails}</p>
                </div>
            </div>
        </>
    );
};

export default LiveSpaceMissionsTracker;
