import React, { useState } from "react";
import { View, TextInput, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useDatabaseConnection } from "../database/DatabaseConnection";
import { Task } from "@/database/entities/task-entity";

export const AddTaskScreen: React.FC = () => {
  const [title, setTitle] = useState("");
  const { connection } = useDatabaseConnection();
  const navigation = useNavigation();

  const addTask = async () => {
    if (connection) {
      const taskRepository = connection.getRepository(Task);
      const newTask = taskRepository.create({ title, completed: false });
      await taskRepository.save(newTask);
      navigation.goBack();
    } else {
    }
  };

  return (
    <View>
      <View style={styles.textInput}>
        <TextInput
          placeholder="Digite aqui..."
          value={title}
          onChangeText={setTitle}
          style={{ fontSize: 18 }}
        />
      </View>
        <Button title="Adicionar tarefa" onPress={addTask} />
      
    </View>
  );
};
const styles = ({
  textInput: {
    marginLeft: 10,
    marginRight: 10,
    marginTop: 15,
    borderWidth: 0.5,
    padding: 5,
    borderRadius: 7,
    borderColor: 'gray'
  }

});
