import Card from "../cards/Card";
import { TaskWithId } from "../../interfaces";
import Sort from "../sort/Sort";
import { useState } from "react";
import { SORT_TYPES } from "../../enums";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { UniqueIdentifier, useDroppable } from "@dnd-kit/core";

type Props = {
  tasks: TaskWithId[];
  title: string;
  id: string;
  activeId: UniqueIdentifier | undefined;
};

const Column: React.FC<Props> = (props) => {
  const [sort, setSort] = useState(SORT_TYPES.CUSTOM);

  const { setNodeRef } = useDroppable({
    id: props.id,
  });

  const sortFunctions: Record<
    string,
    (a: TaskWithId, b: TaskWithId) => number
  > = {
    [SORT_TYPES.ASC_ALPHA]: (a, b) => a.title.localeCompare(b.title),
    [SORT_TYPES.DESC_ALPHA]: (a, b) => b.title.localeCompare(a.title),
    [SORT_TYPES.ASC_DATE]: (a, b) =>
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    [SORT_TYPES.DESC_DATE]: (a, b) =>
      new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
  };

  const sortedTasks =
    props.tasks && sortFunctions[sort]
      ? [...props.tasks].sort(sortFunctions[sort])
      : props.tasks;

  return (
    <>
      <div
        ref={setNodeRef}
        className="w-full md:w-60 bg-white md:px-2 rounded-lg min-h-[500px] h-100"
      >
        <p className="text-center">{props.title}</p>
        <div className="px-4 md:px-0">
          <Sort onSortChange={setSort} />
          <SortableContext
            id={props.title}
            items={sortedTasks}
            strategy={verticalListSortingStrategy}
          >
            {!props.tasks?.length && <div className="min-h-100 h-200"></div>}
            <div className="h-[300px]">
              {sortedTasks?.map((task: TaskWithId) => (
                <Card
                  task={task}
                  key={task.id}
                  active={task.id === props.activeId}
                />
              ))}
            </div>
          </SortableContext>
        </div>
      </div>
    </>
  );
};

export default Column;
