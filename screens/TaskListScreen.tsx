import React, { useCallback, useEffect, useState } from 'react';

import { View, FlatList, StyleSheet} from 'react-native';
import { FAB } from 'react-native-paper';
import { useDatabaseConnection } from '../database/DatabaseConnection';
import { StackNavigationProp } from '@react-navigation/stack';
import TaskItem from '@/components/TaskItem';
import { Task} from '@/database/entities/task-entity';
import { useFocusEffect } from '@react-navigation/native';

type RootStackParamList = {
  TaskList: undefined;
  AddTask: undefined;
};

type TaskListScreenNavigationProp = StackNavigationProp<RootStackParamList, 'TaskList'>;

type Props = {
  navigation: TaskListScreenNavigationProp;
};

const TaskListScreen: React.FC<Props> = ({ navigation }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const { connection } = useDatabaseConnection();

  const fetchTasks = async () => {
    if (connection) {
      const taskRepository = connection.getRepository(Task);
      const tasks = await taskRepository.find();
      setTasks(tasks);
    }
  };

  const toggleTaskCompletion = async (task: Task) => {
    if (connection) {
      const taskRepository = connection.getRepository(Task);
      task.completed = !task.completed;
      await taskRepository.save(task);
      fetchTasks();
    }
  };

  const deleteTask = async (task: Task) => {
    if (connection) {
      const taskRepository = connection.getRepository(Task);
      await taskRepository.delete(task);
      fetchTasks();
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchTasks();
    }, []),
  );


  return (
    <View style={styles.container}>
      <FlatList
        data={tasks}
        renderItem={({ item }) => (
          <TaskItem item={item} toggleTaskCompletion={toggleTaskCompletion} deleteTask={deleteTask} />
        )}
        keyExtractor={(item) => item.id.toString()}
      />
      
      <FAB
        style={styles.fab}
        icon="plus"
        onPress={() => navigation.navigate('AddTask')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
});

export default TaskListScreen;
