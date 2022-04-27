import React, { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    setTasks(oldState => [
      ...oldState, 
      {
        title: newTaskTitle,
        id: (new Date()).getTime(),
        done: false
      }
    ])
  }

  function handleToggleTaskDone(id: number) {
    setTasks(oldState => oldState.map(item => {
      if(item.id === id) 
        return {
          ...item,
          done: !item.done
        }

      return item
    }))
  }

  function handleRemoveTask(id: number) {
    Alert.alert("Confirmar exclusão", "Tem certeza que deseja excluir o item selecionado?", [{
      text: 'Confirmar',
      onPress: () => setTasks(oldState => oldState.filter(item => item.id !== id))
    },
    {
      text: "Cancelar"
    }]);
  }

  function editTask(task: Task) {
    setTasks(oldState => oldState.map(item => {
      if(item.id === task.id) 
        return task
      return item
    }))
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList 
        tasks={tasks} 
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask} 
        editTask={editTask}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})