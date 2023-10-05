import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Task, TaskWithId, TasksFromBE } from "../../interfaces";

export const taskApi = createApi({
  reducerPath: "taskAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000/api/v1",
  }),
  tagTypes: ["Tasks"],
  endpoints: (builder) => ({
    getTasks: builder.query<TasksFromBE, null>({
      query: () => "tasks",
      providesTags: ["Tasks"],
    }),

    getTaskById: builder.query<TaskWithId, { id: string }>({
      query: ({ id }) => `tasks/${id}`,
    }),

    createTask: builder.mutation({
      query: (newTask: Task) => ({
        url: "tasks",
        method: "POST",
        body: newTask,
      }),
      invalidatesTags: ["Tasks"],
    }),

    deleteTask: builder.mutation({
      query: (id: string) => ({
        url: `tasks/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Tasks"],
    }),

    updateTask: builder.mutation({
      query: (updatedTask: TaskWithId) => ({
        url: `tasks/${updatedTask.id}`,
        method: "PUT",
        body: updatedTask,
      }),
      invalidatesTags: ["Tasks"],
    }),
  }),
});

export const {
  useGetTasksQuery,
  useGetTaskByIdQuery,
  useCreateTaskMutation,
  useDeleteTaskMutation,
  useUpdateTaskMutation,
} = taskApi;
