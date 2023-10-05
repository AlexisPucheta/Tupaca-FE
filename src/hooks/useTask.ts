import {
  useCreateTaskMutation,
  useDeleteTaskMutation,
  useUpdateTaskMutation,
} from "../store/tasks/taskApi";
import { useAppSelector } from "./store";
import { useAppDispatch } from "./store";
import { closeModal } from "../store/modal/modalSlice";
import { Task, TaskWithId } from "../interfaces";

export const useTaskAction = () => {
  const { taskSelected } = useAppSelector((state) => state.modal);
  const [updateTask] = useUpdateTaskMutation();
  const [deleteTask] = useDeleteTaskMutation();
  const [createTask] = useCreateTaskMutation();
  const dispatch = useAppDispatch();

  const handleDelete = async () => {
    if (taskSelected?.id) {
      await deleteTask(taskSelected.id);
    }
    dispatch(closeModal());
  };

  const handleUpdate = async (task: TaskWithId) => {
    await updateTask(task);
  };

  const handleCreate = async (task: Task) => {
    await createTask(task);
  };

  return { handleDelete, handleUpdate, handleCreate };
};
