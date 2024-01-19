enum TaskStatus {
    TODO = "TODO",
    EN_COURS = "EN COURS",
    DONE = "DONE"
}

interface Task {
    _id?: string,
    title: string,
    description: string,
    deadline: Date,
    status: TaskStatus,
    order: number
}

export { TaskStatus }
export type { Task }
