import React, { createContext, useContext, useEffect, useState } from "react";
import {
  createTaskReq,
  getTaskReq,
  deleteTaskReq,
  getTaskByIdReq,
  updateTaskReq,
} from "../api/task";

const TaskContext = createContext();

export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) throw new Error("Error en el contexto de las tareas");
  return context;
};

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState(null);

  const getAllTask = async () => {
    try {
      const res = await getTaskReq();
      setTasks(res.data);
    } catch (error) {
      setError("Error al obtener las tareas");
    }
  };

  useEffect(() => {
    getAllTask();
  }, []); // Carga las tareas al montar el componente

  const createTask = async (newTask) => {
    try {
      await createTaskReq(newTask);
      getAllTask(); // Actualiza las tareas después de la creación
    } catch (error) {
      setError("Error al crear la tarea");
    }
  };

  const deleteTask = async (id) => {
    try {
      await deleteTaskReq(id);
      setTasks(tasks.filter((task) => task._id !== id));
    } catch (error) {
      setError("Error al eliminar la tarea");
    }
  };

  const getTaskById = async (id) => {
    try {
      const res = await getTaskByIdReq(id);
      return res.data;
    } catch (error) {
      setError("Error al obtener la tarea por ID");
    }
  };

  const updateTask = async (id, updatedTask) => {
    try {
      await updateTaskReq(id, updatedTask);
      getAllTask(); // Actualiza las tareas después de la actualización
    } catch (error) {
      setError("Error al actualizar la tarea");
    }
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        error,
        createTask,
        getAllTask,
        deleteTask,
        getTaskById,
        updateTask,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};
