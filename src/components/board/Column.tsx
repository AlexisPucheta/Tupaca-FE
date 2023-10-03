import Card from "../cards/Card";
import { TaskWithId } from "../../interfaces";
import Sort from "../sort/Sort";
import { useState } from "react";
import { SORT_TYPES } from "../../enums";

type Props = {
  tasks?: TaskWithId[];
  title: string;
};

const Column: React.FC<Props> = (props) => {
  const [sort, setSort] = useState(SORT_TYPES.CUSTOM);

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

  console.log("ASD", props.tasks);

  const sortedTasks =
    props.tasks && sortFunctions[sort]
      ? [...props.tasks].sort(sortFunctions[sort])
      : props.tasks;
  return (
    <>
      <div className="w-full md:w-60 bg-white md:px-2 h-full rounded-lg">
        <p className="text-center">{props.title}</p>
        <div className="px-4 md:px-0">
          <Sort onSortChange={setSort} />
          {!props.tasks?.length && <div className="min-h-40 h-40"></div>}
          {sortedTasks?.map((task: TaskWithId) => {
            return <Card task={task} key={task._id} />;
          })}
        </div>
      </div>
    </>
  );
};

export default Column;
