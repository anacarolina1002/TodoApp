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
    console.log("Adicionando tarefa...");
    if (connection) {
      const taskRepository = connection.getRepository(Task);
      const newTask = taskRepository.create({ title, completed: false });
      await taskRepository.save(newTask);
      console.log("Tarefa adicionada:", newTask);
      navigation.goBack();
    } else {
      console.error("Erro: Conexão com o banco de dados não encontrada.");
    }
  };

  console.log("Conexão com o banco de dados:", connection);

  return (
    <View>
      <TextInput
        placeholder="Task Title"
        value={title}
        onChangeText={setTitle}
      />
      <Button title="Add Task" onPress={addTask} />
    </View>
  );
};
