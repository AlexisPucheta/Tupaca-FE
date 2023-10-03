import Column from "./Column";
import { MODAL_TYPES } from "../../enums";
import { useAppSelector, useAppDispatch } from "../../hooks/store";
import { openModal } from "../../store/modal/modalSlice";
import { useGetTasksQuery } from "../../store/tasks/taskApi";
import Modal from "../modal/Modal";
import SearchBar from "../filter/searchBar";
import { useState } from "react";

const Board = () => {
  const [filterValue, setFilterValue] = useState("");
  const { isOpen } = useAppSelector((store) => store.modal);
  const dispatch = useAppDispatch();
  const { data: tasks, error, isLoading, isFetching } = useGetTasksQuery(null);
  return (
    <>
      <div className="flex flex-col bg-[#444444] min-h-screen items-center">
        <SearchBar onFilterChange={setFilterValue} />
        {(isLoading || isFetching) && <p>Loading....</p>}
        {error && <p>some Error</p>}
        <div className="w-full h-full flex flex-col md:flex-row justify-around px-6 mt-4 space-y-6 md:space-y-0 pb-40">
          <Column
            tasks={tasks?.ToDo?.filter((task) =>
              task.title.includes(filterValue),
            )}
            title="To-Do"
          />

          <Column
            tasks={tasks?.InProgress?.filter((task) =>
              task.title.includes(filterValue),
            )}
            title="In Progress"
          />

          <Column
            tasks={tasks?.Done?.filter((task) =>
              task.title.includes(filterValue),
            )}
            title="Done"
          />
        </div>
        <div className="fixed bottom-0  bg-black bg-opacity-70 w-full flex justify-center">
          <button
            className="bg-[#66cdaa] rounded-xl p-4 mt-4 mb-4 cursor-pointer"
            onClick={() => {
              dispatch(openModal({ modalType: MODAL_TYPES.ADD_TASK_MODAL }));
            }}
          >
            Add new Task
          </button>
        </div>
        {isOpen && <Modal></Modal>}
      </div>
    </>
  );
};

export default Board;
