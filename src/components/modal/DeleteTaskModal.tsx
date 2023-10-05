import { useAppDispatch, useAppSelector } from "../../hooks/store";
import { closeModal } from "../../store/modal/modalSlice";
import { useTaskAction } from "../../hooks/useTask";

const DeleteTaskModal = () => {
  const dispatch = useAppDispatch();
  const { handleDelete } = useTaskAction();
  const { taskSelected } = useAppSelector((state) => state.modal);
  return (
    <>
      <div>
        <p className="pb-2">Are you sure to delete this following task?</p>
        <p className="text-xl font-bold">{taskSelected?.title}</p>
        <div className="flex justify-around pt-4">
          <button
            onClick={() => {
              handleDelete();
            }}
            className="border border-2 p-2"
          >
            Yes
          </button>
          <button
            onClick={() => {
              dispatch(closeModal());
            }}
            className="border border-2 p-2"
          >
            No
          </button>
        </div>
      </div>
    </>
  );
};

export default DeleteTaskModal;
