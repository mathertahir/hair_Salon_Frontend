import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const useAPI = () => {
    const navigate = useNavigate();

    const instance = axios.create({
        baseURL: 'https://hair-backend-production.up.railway.app',
        // baseURL: 'http://localhost:7000',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    const token = localStorage.getItem('auth_token');
    const storedUser = localStorage.getItem('user');
    const user = storedUser ? JSON.parse(storedUser) : null;

    if (token) {
        instance.defaults.headers.common['Authorization'] = token;
        instance.defaults.headers.common['organizationId'] =
            user?.userRole?.organization?.id;
    } else {
        delete instance.defaults.headers.common['Authorization'];
        delete instance.defaults.headers.common['organizationId'];
    }

    instance.interceptors.response.use(
        (response) => response,
        (error) => {
            if (error.response && error.response.status === 401) {
                localStorage.removeItem('auth_token');
                localStorage.removeItem('user');
                // Redirect to the login page
            }
            return Promise.reject(error);
        }
    );

    return instance;
};

export default useAPI;
