import {
  Task,
  TaskWithId,
  useCreateTaskMutation,
  useDeleteTaskMutation,
  useUpdateTaskMutation,
} from "../store/tasks/taskApi";
import { useAppSelector } from "./store";
import { useAppDispatch } from "./store";
import { closeModal } from "../store/modal/modalSlice";

export const useTaskAction = () => {
  const { taskSelected } = useAppSelector((state) => state.modal);
  const [updateTask] = useUpdateTaskMutation();
  const [deleteTask] = useDeleteTaskMutation();
  const [createTask] = useCreateTaskMutation();
  const dispatch = useAppDispatch();

  const handleDelete =  () => {
    if (taskSelected?._id) {
      deleteTask(taskSelected._id);
    }
    dispatch(closeModal());
  };

  const handleUpdate = (task: TaskWithId) => {
    updateTask(task);
  };

  const handleCreate = (task: Task) => {
    createTask(task)
  }

  return { handleDelete, handleUpdate, handleCreate };
};
