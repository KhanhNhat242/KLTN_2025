import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { StyleSheet } from 'react-native'
import ForgotPasswordScreen from './app/(tabs)/ForgotPassword'
import LoginScreen from './app/(tabs)/Login'
import SignupScreen from './app/(tabs)/Signup'
import WelcomeScreen from './app/(tabs)/Welcome'

const Stack = createNativeStackNavigator()

const App = () => {
  return (
    <NavigationContainer>
        <Stack.Navigator>
            <Stack.Screen name='Welcome' component={WelcomeScreen} />
            <Stack.Screen name='Login' component={LoginScreen} />
            <Stack.Screen name='Signup' component={SignupScreen} />
            <Stack.Screen name='ForgotPassword' component={ForgotPasswordScreen} />
        </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App

const styles = StyleSheet.create({})