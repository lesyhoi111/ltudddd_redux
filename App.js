
import { StyleSheet, Text, SafeAreaView } from "react-native";

import Detail from "./src/components/Detail";

import TodoList from "./src/components/TodoList";

import EditDetail from "./src/components/EditDetail";

import store from "./src/redux/store";

import { Provider } from "react-redux";

import { NavigationContainer } from '@react-navigation/native';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function App() {
  const RootApp = () => {
    return (
    //   <SafeAreaView>
    //     <TodoHeader />
    //     <TodoList />
    //   </SafeAreaView>
            
                <Stack.Navigator initialRouteName="TodoList" screenOptions={{ headerShown: false }}>
                         <Stack.Screen name="TodoList" component={TodoList} />
                     <Stack.Screen name="Detail" component={Detail} />
                     <Stack.Screen name="EditDetail" component={EditDetail} />
                 </Stack.Navigator>
             
    );
  };

  return (
    <Provider store={store}>
        <NavigationContainer><RootApp /></NavigationContainer>
    </Provider>
  );
}

