import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import { useForm } from "react-hook-form";
import { useTasks } from "../context/TaskContext";
import { useNavigate, useParams } from "react-router-dom";

const TaskForm = ({ onSubmit, initialValues }) => {
  const { register, handleSubmit } = useForm({ defaultValues: initialValues });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
        type="text"
        placeholder="Titulo"
        {...register("title")}
        autoFocus
      />
      <textarea
        className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
        rows="3"
        placeholder="Descripción"
        {...register("description")}
      ></textarea>

      <label>
        Completado
        <input type="checkbox" {...register("completed")} />
      </label>
      <button
        className="flex h-10 px-6 font-semibold rounded-md bg-green-900 text-white my-5"
        type="submit"
      >
        Guardar
      </button>
    </form>
  );
};

export const TaskFormPage = () => {
  const { createTask, getTaskById, updateTask } = useTasks();
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function loadTask() {
      if (params.id) {
        const task = await getTaskById(params.id);
        setValue("title", task.title);
        setValue("description", task.description);
      }
    }
    loadTask();
  }, [params.id]);

  const onSubmit = (data) => {
    if (params.id) {
      updateTask(params.id, data);
    } else {
      createTask(data);
    }
    navigate("/task");
  };

  return (
    <div>
      <Navbar />
      <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md">
        <TaskForm onSubmit={onSubmit} />
      </div>
    </div>
  );
};
