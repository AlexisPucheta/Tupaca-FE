import { useAppDispatch } from "../../hooks/store";
import { openModal } from "../../store/modal/modalSlice";
import { MODAL_TYPES } from "../../enums";
import { TaskWithId } from "../../interfaces";

type Props = {
  task: TaskWithId;
};

const Card: React.FC<Props> = ({ task }) => {
  const dispatch = useAppDispatch();
  return (
    <>
      <div className="w-full px-2 my-2 bg-red-300 rounded-lg">
        <p>Title: {task.title}</p>
        <p>{task.index}</p>
        <p>Description: {task.description}</p>
        <p>Status: {task.status}</p>
        <div className="flex justify-end space-x-5">
          <button
            onClick={() => {
              dispatch(
                openModal({
                  modalType: MODAL_TYPES.EDIT_TASK_MODAL,
                  taskSelected: task,
                }),
              );
            }}
          >
            EDIT
          </button>
          <button
            onClick={() => {
              dispatch(
                openModal({
                  modalType: MODAL_TYPES.DELETE_TASK_MODAL,
                  taskSelected: task,
                }),
              );
            }}
          >
            DELETE
          </button>
        </div>
      </div>
    </>
  );
};

export default Card;
