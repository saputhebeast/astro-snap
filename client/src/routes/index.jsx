import { Route, Routes } from 'react-router-dom'
import Login from '@/pages/Login.jsx'
import Contact from '@/pages/Contact'
import Home from "@/pages/Home.jsx";
import Register from "@/pages/Register.jsx";

const AnimatedRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route index path="login" element={<Login/>} />
            <Route path="register" element={<Register/>}/>
            <Route path="contact" element={<Contact/>}/>
        </Routes>
    )
}

export default AnimatedRoutes
