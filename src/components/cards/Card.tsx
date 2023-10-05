import { useAppDispatch } from "../../hooks/store";
import { openModal } from "../../store/modal/modalSlice";
import { MODAL_TYPES } from "../../enums";
import { TaskWithId } from "../../interfaces";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import EditIcon from "../icons/EditIcon";
import DeleteIcon from "../icons/DeleteIcon";

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
        <p className="text-xl font-semibold line-clamp-2">{props.task.title}</p>
        {props.task.description && <p>{props.task.description}</p>}
        <div className="flex justify-end space-x-5 pb-2">
          <button
            className="z-9999"
            onClick={() => {
              dispatch(
                openModal({
                  modalType: MODAL_TYPES.EDIT_TASK_MODAL,
                  taskSelected: props.task,
                }),
              );
            }}
          >
            <EditIcon />
          </button>
          <button
            onClick={() => {
              dispatch(
                openModal({
                  modalType: MODAL_TYPES.DELETE_TASK_MODAL,
                  taskSelected: props.task,
                }),
              );
            }}
          >
            <DeleteIcon />
          </button>
        </div>
      </div>
    </>
  );
};

export default Card;
