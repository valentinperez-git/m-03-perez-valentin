import { useTasks } from "../context/TaskContext";
import { Link } from "react-router-dom";

const TaskCard = ({ task }) => {
  const { deleteTask } = useTasks();

  const handleDeleteTask = () => {
    deleteTask(task._id);
  };

  const taskEditLink = `/task/${task._id}`;

  return (
    <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md">
      <header className="flex justify-between">
        <h1 className="text-2xl font-semibold text-white">{task.title}</h1>
        <div className="flex gap-x-2 items-center">
          <button onClick={handleDeleteTask} className="text-red-500">
            Eliminar
          </button>
          <Link to={taskEditLink} className="text-blue-500">
            Editar
          </Link>
        </div>
      </header>
      <p className="">{task.description}</p>
      <p className="text-2xl font-bold">
        {new Date(task.date).toLocaleDateString()}
      </p>
    </div>
  );
};

export default TaskCard;
