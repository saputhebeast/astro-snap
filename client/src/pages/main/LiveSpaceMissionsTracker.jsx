import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import Header from "@/components/layout/Header.jsx";
import 'leaflet/dist/leaflet.css';

const LiveSpaceMissionsTracker = () => {
    const [issLocation, setIssLocation] = useState([0, 0]);
    const [locationDetails, setLocationDetails] = useState('');

    useEffect(() => {
        const fetchIssLocation = async () => {
            try {
                const issResponse = await axios.get('http://api.open-notify.org/iss-now.json');
                const { latitude, longitude } = issResponse.data.iss_position;
                setIssLocation([parseFloat(latitude), parseFloat(longitude)]);

                const apiKey = '92109e66a0d04bb5b32edb2d200d2abe';
                const locationResponse = await axios.get(`https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${apiKey}`);

                if (locationResponse.data.results.length > 0) {
                    setLocationDetails(locationResponse.data.results[0].formatted);
                } else {
                    setLocationDetails('Location details not available');
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchIssLocation();
        const interval = setInterval(fetchIssLocation, 5000);

        return () => clearInterval(interval);
    }, []);

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
