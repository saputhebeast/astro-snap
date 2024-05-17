import { Route, Routes } from 'react-router-dom'
import Login from '@/pages/Login.jsx'
import Register from "@/pages/Register.jsx";
import useAuth from "@/hooks/useAuth.jsx";
import AstronomyPictureOfTheDay from "@/pages/main/AstronomyPictureOfTheDay.jsx";
import MarsRoverPhotoGallery from "@/pages/main/MarsRoverPhotoGallery.jsx";
import SkyWatchingDiaries from "@/pages/main/SkyWatchingDiaries.jsx";
import EducationalNews from "@/pages/main/EducationalNews.jsx";
import LiveSpaceMissionsTracker from "@/pages/main/LiveSpaceMissionsTracker.jsx";

const AnimatedRoutes = () => {
    useAuth();

    return (
        <Routes>
            <Route index path="login" element={<Login/>} />
            <Route path="register" element={<Register/>}/>
            <Route path="astronomy-picture-of-the-day" element={<AstronomyPictureOfTheDay/>}/>
            <Route path="mars-rover-photo-gallery" element={<MarsRoverPhotoGallery/>}/>
            <Route path="live-space-missions-tracker" element={<LiveSpaceMissionsTracker/>}/>
            <Route path="/" element={<SkyWatchingDiaries/>}/>
            <Route path="educational-news" element={<EducationalNews/>}/>
            <Route path="*" element={<h1>Not Found</h1>} />
        </Routes>
    )
}

export default AnimatedRoutes
