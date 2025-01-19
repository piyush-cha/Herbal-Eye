import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { ThemeProvider } from './src/utils/ThemeContext';
import AppNavigator from './src/navigation/AppNavigator';
import ErrorBoundary from './src/components/ErrorBoundary';

export default function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <NavigationContainer>
          <AppNavigator />
        </NavigationContainer>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

