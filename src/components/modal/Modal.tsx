import React from "react";
import AddTaskModal from "./AddTaskModal";
import EditTaskModal from "./EditTaskModal";
import DeleteTaskModal from "./DeleteTaskModal";
import { closeModal } from "../../store/modal/modalSlice";
import { useAppDispatch } from "../../hooks/store";
import { useAppSelector } from "../../hooks/store";
import { MODAL_TYPES } from "../../enums";

const Modal: React.FC = () => {
  const MODAL_COMPONENTS: Record<string, () => JSX.Element> = {
    [MODAL_TYPES.ADD_TASK_MODAL]: AddTaskModal,
    [MODAL_TYPES.EDIT_TASK_MODAL]: EditTaskModal,
    [MODAL_TYPES.DELETE_TASK_MODAL]: DeleteTaskModal,
  };
  const { modalActive } = useAppSelector((state) => state.modal);
  const dispatch = useAppDispatch();
  return (
    <>
      <div className="bg-black w-full min-h-full min-h-screen opacity-60 fixed"></div>
      <div className="fixed top-[40vh]">
        <div className="bg-white z-10 flex flex-col p-5 rounded-lg">
          <div className="flex justify-end">
            <button
              className=""
              onClick={() => {
                dispatch(closeModal());
              }}
            >
              X
            </button>
          </div>
          <div>{MODAL_COMPONENTS[modalActive]()}</div>
        </div>
      </div>
    </>
  );
};

export default Modal;
