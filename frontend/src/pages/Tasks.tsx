import { useEffect, useState } from "react";
import { createTask, deleteTask, getTasks, updateTask } from "../services/taskApi";
import { Button, message, Popconfirm, Table, Tag } from "antd";
import TaskForm from "../components/TaskForm";
import type { ColumnsType } from "antd/es/table";

export type TaskStatus = "todo" | "in_progress" | "done";

export interface Task {
    task_id: number;
    title: string;
    description?: string;
    status: TaskStatus;
    deadline: string;
    created_by: string;
}


// api get > gak ada tambahan komponen
// api post sama patch > pake modal atau halaman lain
// api delete > pop confirm aja
// api post > +tambah tombol diatas kayak biasa
// api delete sma patch > dijadiin satu kolom aksi
function Tasks() {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [selectedTask, setSelectedTask] = useState<Task | null>(null);

    const fetchTasks = async () => {
        try {
            const data = await getTasks();
            setTasks(data);
        } catch {
            message.error("Failed to load tasks");
        } finally {
            setLoading(false);
        }
    };
    // populasi data dulu sebelum render

    useEffect(() => {
        fetchTasks();
    }, []);

const columns: ColumnsType<Task>  = [
    // title: string;
    // description?: string;
    // status: TaskStatus;
    // deadline: string;
    // created_by: string;
    // + actions

    {
        title: "Title",
        dataIndex: "title",
    },
    {
        title: "Description",
        dataIndex: "description",
        width: 400
    },
    {
        title: "Status",
        dataIndex: "status",
        filters: [
            { text: "Todo", value: "todo" },
            { text: "In Progress", value: "in_progress" },
            { text: "Done", value: "done" },
        ],
        onFilter: (value, record) =>
            record.status === value,
        render: (status) => {
            const color =
                status === "done"
                ? "green"
                : status === "in_progress"
                ? "blue"
                : "yellow";
            const text =
                status === "done"
                ? "DONE"
                : status === "in_progress"
                ? "IN PROGRESS"
                : "TODO";
            return <Tag color={color}>{text}</Tag>;
        },
    },
    {
        title: "Deadline",
        dataIndex: "deadline",
        sorter: (a, b) =>
            new Date(a.deadline).getTime() - new Date(b.deadline).getTime(),
        render: (value: string) =>
            new Date(value).toLocaleDateString('id-ID', {
                day: 'numeric',
                month: 'long',
                year: 'numeric'
            }),
    },    
    {
        title: "Created By",
        dataIndex: "created_by",
    },
    {
        title: "Action",
        align:'center',
        render: (_, record: Task) => (
            <>
                <Button
                    type="link"
                    onClick={() => {
                        setSelectedTask(record);
                        setOpen(true);
                    }}
                >
                    Edit
                </Button>

                <Popconfirm
                    title="Delete this task?"
                    onConfirm={async () => {
                        await deleteTask(record.task_id);
                        message.success("Task deleted");
                        fetchTasks();
                    }}
                >
                    <Button type="link" danger>
                    Delete
                    </Button>
                </Popconfirm>
            </>
        ),
    },
];

// alur post= open modal yes>  setSelectedTask(null) biar inisial data kosong > selectedTask kosong > confirm = post API
// alur patch= open modal yes>  ambil record setSelectedTask(record) data row > selectedTask keiisi > confirm = patch API
return (
    <div className="task-page">
        <h1 style={{ margin:'20px 0'}}>Task list</h1>
        <Button
            type="primary"
            onClick={() => {
                setSelectedTask(null);
                setOpen(true);
            }}
            style={{ marginBottom: 16 }}
        >
            + Add Task
        </Button>

        <Table
            rowKey="task_id"
            loading={loading}
            columns={columns}
            dataSource={tasks}
            scroll={{ y: 700, x: 'max-content' }}
            pagination={{pageSize:5}}
        />

        {/* MODAL buat post sama edit */}
        <TaskForm
            open={open}
            initialValues={selectedTask}
            // no
            onCancel={() => setOpen(false)}
            //yes
            onSubmit={async (values) => {
                try {
                    if (selectedTask) {
                        await updateTask(selectedTask.task_id, values);
                        message.success("Task updated");
                    } else {
                        await createTask(values);
                        message.success("Task created");
                    }
                    setOpen(false);
                    fetchTasks(); // reload data
                } catch {
                    message.error("Action failed");
                }
            }}
        />
    </div>
)
}

export default Tasks