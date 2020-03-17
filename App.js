import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import BottomTabNavigator from './src/navigation/BottomTabNavigator';
import Login from './src/screens/Login';
import CreateAccount from './src/screens/CreateAccount'
import InputPersonalInfo from './src/screens/InputPersonalInfo'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import rootReducer from './src/reducers' // Importing the index (do not need specifying)
import {decode, encode} from 'base-64'

if (!global.btoa) {global.btoa = encode}

if (!global.atob) {global.atob = decode}

//Create a stack navigator 
const Stack = createStackNavigator();

//Create a store using the rootReducer 
const store = createStore(rootReducer)

export default function App() {

    return (
        <Provider store={store}>
        <NavigationContainer >
                <Stack.Navigator >
                    <Stack.Screen name="Login" options={{ headerLeft: null }} component={Login} />
                    <Stack.Screen name="CreateAccount" component={CreateAccount} />
                    <Stack.Screen name="InputPersonalInfo" component={InputPersonalInfo}/>
                    <Stack.Screen name="Main" options={{ headerLeft: null }} component={BottomTabNavigator} />
            </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    );
}

// import * as React from 'react';
// import { Platform, StatusBar, StyleSheet, View } from 'react-native';
// import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';

// import BottomTabNavigator from './src/navigation/BottomTabNavigator';

// const Stack = createStackNavigator();

// export default function App(props) {
//   return (
//     <View style={styles.container}>
//       {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
//       <NavigationContainer >
//         <Stack.Navigator>
//           <Stack.Screen name="Root" component={BottomTabNavigator} />
//         </Stack.Navigator>
//       </NavigationContainer>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//   },
// });
