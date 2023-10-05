import { useAppDispatch } from "../../hooks/store";
import { openModal } from "../../store/modal/modalSlice";
import { MODAL_TYPES } from "../../enums";
import { TaskWithId } from "../../interfaces";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

type Props = {
  task: TaskWithId;
  active: boolean;
};

const Card: React.FC<Props> = (props) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: props.task.id });
  const dispatch = useAppDispatch();

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <>
      <div
        style={style}
        {...attributes}
        {...listeners}
        ref={setNodeRef}
        className={`
          w-full px-2 my-2 bg-red-300 rounded-lg + ${
            props.active ? "opacity-0" : "opacity-100"
          }`}
        id={props.task.id}
      >
        <p>Title: {props.task.title}</p>
        <p>{props.task.index}</p>
        <p>Description: {props.task.description}</p>
        <p>Status: {props.task.status}</p>
        <div className="flex justify-end space-x-5">
          <button
            className="z-9999"
            onClick={() => {
              dispatch(
                openModal({
                  modalType: MODAL_TYPES.EDIT_TASK_MODAL,
                  taskSelected: props.task,
                })
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
                  taskSelected: props.task,
                })
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
