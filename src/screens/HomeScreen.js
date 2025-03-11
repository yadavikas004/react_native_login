// src/screens/HomeScreen.js
import React from 'react';
import { View, Text, Button } from 'react-native';
import { useDispatch } from 'react-redux';
import { logout } from '../redux/authSlice';

export default function HomeScreen() {
  const dispatch = useDispatch();

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Welcome to Home!</Text>
      <Button title="Logout" onPress={() => dispatch(logout())} />
    </View>
  );
}
