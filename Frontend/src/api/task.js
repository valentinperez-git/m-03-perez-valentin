import instance from "./setCredentialsAxios";

export const getTaskReq = () => instance.get("/task");

export const createTaskReq = (task) => instance.post("/task", task);

export const getTaskByIdReq = (id) => instance.get(`/task/${id}`);

export const updateTaskReq = (id, task) => instance.put(`/task/${id}`, task);

export const deleteTaskReq = (id) => instance.delete(`/task/${id}`);
