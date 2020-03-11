import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import BottomTabNavigator from './src/navigation/BottomTabNavigator';
import Login from './src/screens/Login';
import CreateAccount from './src/screens/CreateAccount'
import { createStore } from 'redux'
import { Provider } from 'react-redux'

//Create a stack navigator 
const Stack = createStackNavigator();

//Initial state of the store 
const initialState = {
    email: "",
    passsword: ""
}
//Modfies the store depending on actions 
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case "EMAIL":
            return { ...state, email: action.email }
        case "PASSWORD":
            return { ...state, password: action.password }
        default:
            return state
    }
}

const store = createStore(reducer)

export default function App() {

    return (
        <Provider store={store}>
        <NavigationContainer >
                <Stack.Navigator >
                    <Stack.Screen name="Login" options={{ headerLeft: null }} component={Login} />
                    <Stack.Screen name="CreateAccount" component={CreateAccount} />
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
