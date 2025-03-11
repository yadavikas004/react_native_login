import jwt_decode from 'jwt-decode';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { logout } from '../redux/authSlice';
import { store } from '../redux/store';
import { API_BASE_URL } from '@env';

export const checkTokenValidity = async () => {
    const token = await AsyncStorage.getItem('token');
    console.log("Retrieved Token from Storage:", token); // ✅ Debugging
    if (!token) {
        console.log("No token found.");
        return false;
    }
    try {
        const decoded = jwt_decode(token);
        const expiryTime = decoded.exp * 1000; // Convert to milliseconds

        if (expiryTime < Date.now()) {
            console.log("Token expired, logging out...");
            await AsyncStorage.removeItem('token');
            store.dispatch(logout());
            return false;
        }

        console.log("Token is still valid!");
        return true;
    } catch (error) {
        console.log("Error decoding token:", error);
        await AsyncStorage.removeItem('token');
        store.dispatch(logout());
        return false;
    }
};


// Get the token from AsyncStorage
export const getToken = async () => {
    return await AsyncStorage.getItem('token');
};

// Remove the token to AsyncStorage
export const removeToken = async () => {
    await AsyncStorage.removeItem('token');
};

// Save the token to AsyncStorage
export const saveToken = async (token) => {
    try {
        await AsyncStorage.setItem('token', token);
        console.log('Token saved successfully');
    } catch (error) {
        console.error('Error saving token:', error);
    }
};

export const getBaseUrl = () => {
    return API_BASE_URL;
};