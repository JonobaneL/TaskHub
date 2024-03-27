type StatusType = "none" | "in progress" | "done" | "stuck";
type PriorityType = "" | "low" | "medium" | "hight";
type MessageType = {
  content: string;
  author: string;
};
export type TaskType = {
  id: string;
  task: string;
  status: StatusType;
  "due-date": string;
  priority: PriorityType;
  note: string;
  conversation: null | MessageType[];
};
export const todo = [
  {
    id: "6600448ea19865eb9dde68cb",
    task: "National Division Representative",
    status: "done",
    "due-date": "2024-07-01T14:59:53.678Z",
    priority: "hight",
    note: "",
    conversation: null,
  },
  {
    id: "66004499a19865eb9dde68cc",
    task: "Forward Tactics Director",
    status: "stuck",
    "due-date": "2024-09-01T09:45:38.952Z",
    priority: "medium",
    note: "",
    conversation: null,
  },
  {
    id: "660044a0a19865eb9dde68cd",
    task: "Regional Operations Director",
    status: "in progress",
    "due-date": "2024-04-05T17:55:08.445Z",
    priority: "",
    note: "",
    conversation: null,
  },
  {
    id: "660044a7a19865eb9dde68ce",
    task: "Legacy Infrastructure Director",
    status: "stuck",
    "due-date": "2024-09-12T14:57:46.654Z",
    priority: "low",
    note: "",
    conversation: null,
  },
  {
    id: "660044a0a19865eb9dde68sdw",
    task: "Regional Operations Director 1",
    status: "done",
    "due-date": "2024-04-05T17:55:08.445Z",
    priority: "",
    note: "",
    conversation: null,
  },
  {
    id: "660044aea19865eb9dde68cf",
    task: "Corporate Infrastructure Agent",
    status: "done",
    "due-date": "2024-04-30T21:54:54.524Z",
    priority: "hight",
    note: "",
    conversation: null,
  },
  {
    id: "660044b4a19865eb9dde68d0",
    task: "Principal Metrics Agent",
    status: "in progress",
    "due-date": "2024-09-24T06:00:45.555Z",
    priority: "medium",
    note: "",
    conversation: null,
  },
] as TaskType[];
