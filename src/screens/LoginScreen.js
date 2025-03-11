import React, { useState } from 'react';
import { 
    View, 
    Text, 
    TextInput, 
    TouchableOpacity, 
    Alert, 
    StyleSheet, 
    Dimensions 
} from 'react-native';
import { useDispatch } from 'react-redux';
import api from '../utils/api';
import { loginSuccess } from '../redux/authSlice';
import { useNavigation } from '@react-navigation/native';
import { saveToken } from '../utils/auth';

const { width, height } = Dimensions.get('window'); // Get screen width & height

export default function LoginScreen() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const navigation = useNavigation();

    const handleLogin = async () => {
        try {
            const response = await api.post('/app/auth/login', { email, password });
            console.log('API Response:', response);
            
            if (response.data.data.token) {
                const token = response.data.data.token;
                const user = {
                    email: response.data.data.email,
                    roles: response.data.data.roles
                };
                
                // Save token to AsyncStorage
                await saveToken(token);
                
                // Dispatch login success action
                dispatch(loginSuccess({ token, user }));
                
                // Navigate to Home screen
                //navigation.replace('Home');
                
                //console.log('Login Successful. Redirecting to Home.');
                //Alert.alert('Success', 'Login Successful');
            } else {
                Alert.alert('Login Failed', 'Invalid credentials');
            }
        } catch (error) {
            console.log('Login Error:', error);
            console.log('Error response:', error.response);
            console.log('Error message:', error.message);
            Alert.alert('Login Failed', error.response?.data?.message || 'An error occurred during login');
        }
    };      
    
    
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Login</Text>
            
            <TextInput 
                style={styles.input} 
                placeholder="Email" 
                placeholderTextColor="#aaa"
                value={email} 
                onChangeText={setEmail} 
                keyboardType="email-address"
                autoCapitalize="none"
            />

            <TextInput 
                style={styles.input} 
                placeholder="Password" 
                placeholderTextColor="#aaa"
                value={password} 
                onChangeText={setPassword} 
                secureTextEntry 
            />

            <TouchableOpacity style={styles.button} onPress={handleLogin}>
                <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#f4f4f4',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 30,
        color: '#333',
    },
    input: {
        width: width * 0.85, // 85% of screen width
        height: 50,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
        paddingHorizontal: 15,
        fontSize: 16,
        backgroundColor: '#fff',
        marginBottom: 15,
    },
    button: {
        width: width * 0.85,
        height: 50,
        backgroundColor: '#007bff',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        marginTop: 10,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    errorText: {
        color: 'red',
        marginBottom: 10,
    }
});
