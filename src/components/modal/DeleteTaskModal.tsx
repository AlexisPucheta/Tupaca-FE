import { useAppDispatch } from "../../hooks/store";
import { closeModal } from "../../store/modal/modalSlice";
import { useTaskAction } from "../../hooks/useTask";

const DeleteTaskModal = () => {
  const dispatch = useAppDispatch();
  const { handleDelete } = useTaskAction();
  return (
    <>
      <div>
        <p>Are you sure to delete this task?</p>
        <div className="flex justify-around">
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
