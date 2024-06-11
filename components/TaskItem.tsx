import { Task } from '@/database/entities/task-entity';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Checkbox } from 'react-native-paper'; // Importação correta

interface TaskItemProps {
  item: Task;
  toggleTaskCompletion: (task: Task) => Promise<void>;
}

const TaskItem: React.FC<TaskItemProps> = ({ item, toggleTaskCompletion }) => {
  return (
    <View style={styles.taskItem}>
      <Checkbox
        status={item.completed ? 'checked' : 'unchecked'}
        onPress={() => toggleTaskCompletion(item)}
      />
      <Text style={item.completed ? styles.taskTextCompleted : styles.taskText}>
        {item.title}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  taskItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  taskText: {
    marginLeft: 10,
    fontSize: 16,
  },
  taskTextCompleted: {
    marginLeft: 10,
    fontSize: 16,
    textDecorationLine: 'line-through',
    color: 'gray',
  },
});

export default TaskItem;
