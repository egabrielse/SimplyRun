import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TabBarIcon from '../components/TabBarIcon';
import SimplyRun from '../screens/SimplyRun'
import Settings from '../screens/Settings'
import RunLog from '../screens/RunLog'

const BottomTab = createBottomTabNavigator();
const INITIAL_ROUTE_NAME = 'SIMPLY_RUN';

export default function BottomTabNavigator({ navigation, route }) {
  // Set the header title on the parent stack navigator depending on the
  // currently active tab. Learn more in the documentation:
  // https://reactnavigation.org/docs/en/screen-options-resolution.html
  navigation.setOptions({ headerTitle: getHeaderTitle(route) });

  return (
    <BottomTab.Navigator initialRouteName={INITIAL_ROUTE_NAME}>
      <BottomTab.Screen
        name="RUN_LOG"
        component={RunLog}
        options={{
          title: 'Run Log',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-code-working" />,
        }}
      />
      <BottomTab.Screen
        name="SIMPLY_RUN"
        component={SimplyRun}
        options={{
          title: 'Simply Run',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-code-working" />,
        }}
      />
      <BottomTab.Screen
        name="SETTINGS"
        component={Settings}
        options={{
          title: 'Settings',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-book" />,
        }}
      />
    </BottomTab.Navigator>
  );
}

function getHeaderTitle(route) {
  const routeName = route.state?.routes[route.state.index]?.name ?? INITIAL_ROUTE_NAME;

  switch (routeName) {
    case 'RUN_LOG':
      return 'Run Log';
    case 'SIMPLY_RUN':
      return 'Simply Run';
    case 'SETTINGS':
      return 'Settings';
  }
}
