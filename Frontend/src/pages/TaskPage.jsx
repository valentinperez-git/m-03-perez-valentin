import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { useTasks } from "../context/TaskContext";
import TaskCard from "../components/TaskCard";


const LoadingMessage = () => <p>Cargando tareas...</p>;

const ErrorMessage = () => <p>Error al cargar tareas. Inténtalo de nuevo más tarde.</p>;

export const TaskPage = () => {
  const { getAllTask, task } = useTasks();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await getAllTask();
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Navbar />
      <h1>Tareas</h1>

      {loading && <LoadingMessage />}

      {error && <ErrorMessage />}

      {task.length === 0 && !loading && !error && <h1>No Tiene Tareas</h1>}

      <div className="grid grid-cols-3 gap-2">
        {task.map((taskItem, i) => (
          <TaskCard task={taskItem} key={i} />
        ))}
      </div>
    </>
  );
};
