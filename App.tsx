import 'reflect-metadata';
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { AddTaskScreen } from "./screens/AddTaskScreen";
import { DatabaseConnectionProvider } from "./database/DatabaseConnection";
import TaskListScreen from './screens/TaskListScreen';

const Stack = createStackNavigator();

const App: React.FC = () => {
  return (
    <DatabaseConnectionProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="TaskList">
          <Stack.Screen name="TaskList" component={TaskListScreen} />
          <Stack.Screen name="AddTask" component={AddTaskScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </DatabaseConnectionProvider>
  );
};

export default App;
