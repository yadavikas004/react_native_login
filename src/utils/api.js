import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_BASE_URL } from '@env'; // Import environment variable
import { Alert } from 'react-native';

const api = axios.create({
  baseURL: API_BASE_URL, // Use .env base URL
});

api.interceptors.request.use(async (config) => {
  console.log('API Request:', config.method, config.url);
    try {
      const token = await AsyncStorage.getItem('token');
      console.log('Retrieved Token from Storage:', token); // Debugging token retrieval
      if (!token) {
        console.warn('Token is missing, user might be logged out');
      } else {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      console.error('Error retrieving token:', error);
    }
    return config;
  }, error => Promise.reject(error));

  api.interceptors.response.use(
    response => {
      console.log('API Response:', response.status, response.data);
      return response;
    },
    error => {
      console.log('API Error:', error);
      if (error.response && error.response.status === 401) {
        Alert.alert('Unauthorized', 'Your session has expired. Please log in again.');
      }
      return Promise.reject(error);
    }
  );

export default api;
