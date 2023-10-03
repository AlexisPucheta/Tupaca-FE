import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { Task } from "../../interfaces";
import { useAppDispatch, useAppSelector } from "../../hooks/store";
import { closeModal } from "../../store/modal/modalSlice";
import { useTaskAction } from "../../hooks/useTask";

const schema = yup
  .object({
    title: yup.string().required().min(3),
    description: yup.string().optional(),
    status: yup.string().optional(),
  })
  .required();

interface Props {
  isEditMode?: boolean;
}
const Form: React.FC<Props> = (props) => {
  const { taskSelected } = useAppSelector((state) => state.modal);
  const { handleUpdate, handleCreate } = useTaskAction();
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ mode: "all", resolver: yupResolver(schema) });
  const onSubmit = (data: Task) => {
    const updatedTask = {
      ...taskSelected,
      title: data.title,
      description: data.description,
      status: data.status,
    };
    props.isEditMode && updatedTask?._id
      ? handleUpdate(updatedTask)
      : handleCreate(data);
    dispatch(closeModal());
    reset();
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col w-80">
        <label>Title</label>
        <input
          defaultValue={props.isEditMode ? taskSelected?.title : ""}
          placeholder="Enter the task title"
          {...register("title")}
          className="border-2"
        />
        <p className="text-red-500 capitalize">{errors.title?.message}</p>
        <label>Description</label>
        <input
          defaultValue={props.isEditMode ? taskSelected?.description : ""}
          placeholder="Enter the task description"
          {...register("description")}
          className="border-2"
        />
        <p className="text-red-500 capitalize">{errors.description?.message}</p>
        <div>
          <select
            {...register("status")}
            defaultValue={props.isEditMode ? taskSelected?.status : ""}
          >
            <option value="ToDo">To-Do</option>
            <option value="InProgress">In Progress</option>
            <option value="Done">Done</option>
          </select>
        </div>
        <input className="bg-[#66cdaa] rounded-xl" type="submit" />
      </form>
    </div>
  );
};

export default Form;
