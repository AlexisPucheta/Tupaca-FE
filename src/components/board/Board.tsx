import Column from "./Column";
import { MODAL_TYPES, STATUS } from "../../enums";
import { useAppSelector, useAppDispatch } from "../../hooks/store";
import { openModal } from "../../store/modal/modalSlice";
import { useGetTasksQuery } from "../../store/tasks/taskApi";
import Modal from "../modal/Modal";
import SearchBar from "../filter/searchBar";
import { useEffect, useState, useRef } from "react";
import {
  DndContext,
  useSensors,
  useSensor,
  PointerSensor,
  UniqueIdentifier,
  DragStartEvent,
  DragOverEvent,
  closestCorners,
  DragOverlay,
  closestCenter,
} from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { TaskWithId } from "../../interfaces";
import { useTaskAction } from "../../hooks/useTask";
import Card from "../cards/Card";

const Board = () => {
  const { data: tasks, error, isLoading, isFetching } = useGetTasksQuery(null);
  const [filterValue, setFilterValue] = useState("");
  const { isOpen } = useAppSelector((store) => store.modal);
  const dispatch = useAppDispatch();
  const [toDoTasks, setToDoTasks] = useState<TaskWithId[]>([]);
  const [inProgressTasks, setInProgressTasks] = useState<TaskWithId[]>([]);
  const [doneTasks, setDoneTasks] = useState<TaskWithId[]>([]);
  const activeTask = useRef<TaskWithId>();
  const overTask = useRef<TaskWithId>();
  const activeId = useRef<UniqueIdentifier>();
  const overId = useRef<UniqueIdentifier>();
  const { handleUpdate } = useTaskAction();

  const [draggingId, setDraggingId] =useState<UniqueIdentifier | undefined>(undefined)

  useEffect(() => {
    setToDoTasks(tasks?.toDo || []);
  }, [tasks?.toDo]);

  useEffect(() => {
    setInProgressTasks(tasks?.inProgress || []);
  }, [tasks?.inProgress]);

  useEffect(() => {
    setDoneTasks(tasks?.done || []);
  }, [tasks?.done]);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  const onDragEnd = () => {
    //Drag and Drop in same column
    if (activeTask.current?.status === overTask.current?.status) {
      let sourceTasks, setSourceTasks;
      if (activeTask.current?.status == STATUS.TODO) {
        sourceTasks = toDoTasks;
        setSourceTasks = setToDoTasks;
      } else if (activeTask.current?.status === STATUS.IN_PROGRESS) {
        sourceTasks = inProgressTasks;
        setSourceTasks = setInProgressTasks;
      } else if (activeTask.current?.status === STATUS.DONE) {
        sourceTasks = doneTasks;
        setSourceTasks = setDoneTasks;
      }

      if (sourceTasks && setSourceTasks) {
        const oldIndex = sourceTasks.findIndex(
          (task) => task.id === activeId.current
        );
        const newIndex = sourceTasks.findIndex(
          (task) => task.id === overId.current
        );
        if (oldIndex !== -1 && newIndex !== -1) {
          setSourceTasks((tasks) => arrayMove(tasks, oldIndex, newIndex));
        }
        if (activeTask.current)
          handleUpdate({ ...activeTask.current, index: newIndex });
        //ver
        if (overTask?.current)
          handleUpdate({ ...overTask.current, index: oldIndex });
      }
    }

    // Drag and drop between different columns, or empty columns
    else {
      let sourceTasks, setSourceTasks, destinationTasks, setDestinationTasks;
      if (activeTask.current?.status === STATUS.TODO) {
        sourceTasks = toDoTasks;
        setSourceTasks = setToDoTasks;
      } else if (activeTask.current?.status === STATUS.IN_PROGRESS) {
        sourceTasks = inProgressTasks;
        setSourceTasks = setInProgressTasks;
      } else if (activeTask.current?.status === STATUS.DONE) {
        sourceTasks = doneTasks;
        setSourceTasks = setDoneTasks;
      }

      let newStatus: STATUS;
      if (
        overTask.current?.status === STATUS.TODO ||
        overId.current === STATUS.TODO
      ) {
        newStatus = STATUS.TODO;
        destinationTasks = toDoTasks;
        setDestinationTasks = setToDoTasks;
      } else if (
        overTask.current?.status === STATUS.IN_PROGRESS ||
        overId.current === STATUS.IN_PROGRESS
      ) {
        newStatus = STATUS.IN_PROGRESS;
        destinationTasks = inProgressTasks;
        setDestinationTasks = setInProgressTasks;
      } else if (
        overTask.current?.status === STATUS.DONE ||
        overId.current === STATUS.DONE
      ) {
        newStatus = STATUS.DONE;
        destinationTasks = doneTasks;
        setDestinationTasks = setDoneTasks;
      }
      if (
        sourceTasks &&
        setSourceTasks &&
        destinationTasks &&
        setDestinationTasks
      ) {
        const sourceIndex = sourceTasks.findIndex(
          (task) => task.id === activeId.current
        );
        if (sourceIndex !== -1) {
          setSourceTasks((tasks) =>
            tasks.filter((task) => task.id !== activeId.current)
          );
          const destinationIndex = destinationTasks.findIndex(
            (task) => task.id === overId.current
          );
          setDestinationTasks((tasks) => {
            if (activeTask.current) {
              activeTask.current = { ...activeTask.current, status: newStatus };
            }
            const newTasks = [...tasks];
            if (destinationIndex !== -1 && activeTask.current) {
              newTasks.splice(destinationIndex, 0, activeTask.current);
              //cambiar por ternario
              handleUpdate({
                ...activeTask.current,
                index: destinationIndex,
              });
            } else if (activeTask.current) {
              handleUpdate({
                ...activeTask.current,
                index: 0,
              });
              newTasks.push(activeTask.current);
              // Agrega al final si no se encontró la posición de inserción
            }
            return newTasks;
          });
        }
      }
    }
   setDraggingId(undefined)
  };

  const onDragStart = (e: DragStartEvent) => {
    activeId.current = e.active.id;
    const active =
      toDoTasks.find((t) => t.id === e.active.id) ||
      inProgressTasks.find((t) => t.id === e.active.id) ||
      doneTasks.find((t) => t.id === e.active.id);
    activeTask.current = active;
    setDraggingId(activeId.current)
  };

  const onDragOver = (e: DragOverEvent) => {
    const over =
      toDoTasks.find((t) => t.id === e.over?.id) ||
      inProgressTasks.find((t) => t.id === e.over?.id) ||
      doneTasks.find((t) => t.id === e.over?.id);
    overId.current = e.over?.id;
    overTask.current = over;
  };
  return (
    <>
      <div className="flex flex-col bg-[#444444] min-h-screen items-center">
        <SearchBar onFilterChange={setFilterValue} />
        {(isLoading || isFetching) && !tasks && <p>Loading....</p>}
        {error && <p>some Error</p>}
        <div className="w-full h-full flex flex-col md:flex-row justify-around px-6 mt-4 space-y-6 md:space-y-0 pb-40">
          <DndContext
            collisionDetection={closestCenter}
            onDragEnd={onDragEnd}
            onDragStart={onDragStart}
            sensors={sensors}
            onDragOver={onDragOver}
          >
            <Column
              tasks={toDoTasks.filter((task) =>
                task.title.includes(filterValue)
              )}
              title="To-Do"
              id="toDo"
              activeId={draggingId}
            />

            <Column
              tasks={inProgressTasks.filter((task) =>
                task.title.includes(filterValue)
              )}
              title="In Progress"
              id="inProgress"
              activeId={draggingId}
            />

            <Column
              tasks={doneTasks.filter((task) =>
                task.title.includes(filterValue)
              )}
              title="Done"
              id="done"
              activeId={draggingId}
            />
            <DragOverlay>
              {activeTask.current?.id ? (
                <Card
                  task={activeTask.current}
                  key={activeTask.current.id}
                  active={false}
                />
              ) : null}
            </DragOverlay>
          </DndContext>
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
        {isOpen && <Modal />}
      </div>
    </>
  );
};

export default Board;
