import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { StyleSheet } from 'react-native'
import HomeScreen from './app/(tabs)/index'
import LoginScreen from './app/(tabs)/Login'

// type StackParamList = {
//   Home: undefined;
//   Login: undefined;
// };

const Stack = createNativeStackNavigator<StackParamList>()

const App = () => {
  return (
    <NavigationContainer>
        <Stack.Navigator>
            <Stack.Screen name='Home' component={HomeScreen} />
            <Stack.Screen name='Login' component={LoginScreen} />
        </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App

const styles = StyleSheet.create({})