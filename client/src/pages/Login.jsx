import React, {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import axios from 'axios';
import {Button} from "@/components/ui/Button";
import {Input} from "@/components/ui/Input";
import {Label} from "@/components/ui/Label";
import {Icons} from "@/components/ui/Icons";
import nasa from '../assets/nasa.jpg';

const Login = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const onSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true);

        try {
            const response = await axios.post('http://localhost:8085/api/v1/auth/login', {
                email,
                password,
            });
            localStorage.setItem('token', response.data.data.access_token);
            navigate('/');
        } catch (error) {
            console.error('Login failed', error.response || error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex h-screen bg-dark-blue-500">
            <div className="w-1/2 flex justify-center items-center m-10">
                <img src={nasa} className="rounded-3xl max-w-full h-full" alt="nasa"/>
            </div>
            <div className="w-1/2 flex flex-col justify-center items-center space-y-4">
                <h1 className="text-2xl mb-4">Login</h1>
                <form onSubmit={onSubmit}
                      className="bg-white p-4 rounded-lg w-full max-w-md">
                    <div className="grid gap-2">
                        <div className="grid gap-1">
                            <Label className="sr-only" htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                className="w-full"
                                placeholder="Enter your email"
                                type="email"
                                autoCapitalize="none"
                                autoComplete="email"
                                autoCorrect="off"
                                disabled={isLoading}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="grid gap-1">
                            <Label className="sr-only" htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                className="w-full"
                                placeholder="Enter your password"
                                type="password"
                                autoCapitalize="none"
                                autoCorrect="off"
                                disabled={isLoading}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <Button disabled={isLoading}>
                            {isLoading ? (
                                <Icons.spinner className="mr-2 h-4 w-4 animate-spin"/>
                            ) : 'Login'}
                        </Button>
                    </div>
                </form>
                <p className="text-gray-500">Dont have an account? <Link to="/register" className="underline">Register</Link></p>
            </div>
        </div>
    );
};

export default Login;
