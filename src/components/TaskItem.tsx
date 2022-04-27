import React, { useState } from 'react';
import Icon from 'react-native-vector-icons/Feather';

import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

import { Task } from "./TasksList";
import { ItemWrapper } from './ItemWrapper';
import trashIcon from '../assets/icons/trash/trash.png';

interface TaskItemProps {
  index: number;
  task: Task;
  toggleTaskDone: (id: number) => void;
  removeTask: (id: number) => void;
  editTask: (edited: Task) => void;
}

export function TaskItem({index, task, toggleTaskDone, removeTask, editTask}: TaskItemProps) {
  const [edit, setEdit] = useState(false);
  const [newText, setNewText] = useState(task.title);

  function handleStartEdit() {
    setEdit(true);
  }

  function handleEndEdit() {
    setEdit(false);
    
    if(newText) {
      editTask({
        ...task,
        title: newText
      });
    } else {      
      setNewText(task.title);
    }
  }

  function handleCancel() {
    setEdit(false);
    setNewText(task.title);
  }

  return (
    <ItemWrapper index={index}>
    <View>
      <TouchableOpacity
        testID={`button-${index}`}
        activeOpacity={0.7}
        style={styles.taskButton}
        onPress={() => toggleTaskDone(task.id)}
      >
        <View 
          testID={`marker-${index}`}
          style={task.done ? styles.taskMarkerDone : styles.taskMarker}
        >
          { task.done && (
            <Icon
              name="check"
              size={12}
              color="#FFF"
            />
          )}
        </View>

        { edit ? (
          <TextInput value={newText} onChangeText={setNewText} onSubmitEditing={handleEndEdit}/>
        ) : (
            <Text 
            style={task.done ? styles.taskTextDone : styles.taskText}
          >
            {task.title}
          </Text>
        ) }
      </TouchableOpacity>
    </View>

    <View style={styles.optionsContainer}>
    { edit ? (
           <TouchableOpacity
           testID={`cancel-${index}`}
           onPress={handleCancel}
           >
                 <Icon
                   name="x"
                   size={17}
                   color="#b5b5b5"
                   />
         </TouchableOpacity> 
    ) : (
      <TouchableOpacity
        testID={`edit-${index}`}
        style={{  }}
        onPress={handleStartEdit}
        >
              <Icon
                name="edit-2"
                size={17}
                color="#b5b5b5"
                />
      </TouchableOpacity>
    )}
    <TouchableOpacity
        testID={`trash-${index}`}
        style={{ paddingHorizontal: 24, opacity: edit ? 0.2 : 1 }}
        onPress={() => removeTask(task.id)}
        disabled={edit}
        >
              <Icon
                name="trash-2"
                size={17}
                color="#b5b5b5"
                />
      </TouchableOpacity>
          </View>
    </ItemWrapper>
  )
}

const styles = StyleSheet.create({
  taskButton: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 15,
    marginBottom: 4,
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center'
  },
  taskMarker: {
    height: 16,
    width: 16,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#B2B2B2',
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  taskText: {
    color: '#666',
    fontFamily: 'Inter-Medium'
  },
  taskMarkerDone: {
    height: 16,
    width: 16,
    borderRadius: 4,
    backgroundColor: '#1DB863',
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  taskTextDone: {
    color: '#1DB863',
    textDecorationLine: 'line-through',
    fontFamily: 'Inter-Medium'
  },
  optionsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
  }
})