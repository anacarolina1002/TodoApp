import { Task } from '@/database/entities/task-entity';
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Checkbox } from 'react-native-paper';
import { Feather } from '@expo/vector-icons';

interface TaskItemProps {
  item: Task;
  toggleTaskCompletion: (task: Task) => Promise<void>;
  deleteTask: (task: Task) => Promise<void>;
}

const TaskItem: React.FC<TaskItemProps> = ({ item, toggleTaskCompletion,deleteTask }) => {
  return (
    <View style={styles.taskItem}>
      <View style={styles.taskBorder}>
      <Checkbox
        status={item.completed ? 'checked' : 'unchecked'}
        onPress={() => toggleTaskCompletion(item)}
        color='black'
      />
      </View>
      <Text style={item.completed ? styles.taskTextCompleted : styles.taskText}>
        {item.title}
      </Text>
      <TouchableOpacity onPress={() => deleteTask(item)}>
        <Feather name="trash" size={24} color="black"/>
      </TouchableOpacity>
      
    </View>
  );
};

const styles = StyleSheet.create({
  taskItem: {
    flexDirection: 'row',
    alignItems: 'center',
    width:'100%',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  taskText: {
    flex:1,
    marginLeft: 10,
    fontSize: 16,
  },
  taskTextCompleted: {
    flex:1,
    marginLeft: 10,
    fontSize: 16,
    textDecorationLine: 'line-through',
    color: 'gray',
  },
  taskBorder:{
    borderColor:'black',
    borderWidth:1,
    borderRadius:7

  }
});

export default TaskItem;
