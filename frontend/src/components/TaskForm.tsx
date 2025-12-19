// components/TaskForm.tsx
import { Form, Input, Modal, DatePicker, Select } from "antd";
import dayjs from "dayjs";


export type TaskStatus = "todo" | "in_progress" | "done";

export interface Task {
    task_id: number;
    title: string;
    description?: string;
    status: TaskStatus;
    deadline: string;
    created_by: string; // udah di handle backend dr JWT
    // inget2 juga input cuman title sampai deadline doang
}

type Props = {
    open: boolean;
    onCancel: () => void;
    onSubmit: (values: Task) => void;
    initialValues?: Task | null;
};

export default function TaskForm({ open, onCancel, onSubmit, initialValues }: Props) {

    const [form] = Form.useForm();

return (
    <Modal
        open={open}
        title={initialValues ? "Edit Task" : "Add Task"}
        okText="Save"
        onCancel={onCancel}
        onOk={() => form.submit()}
    >
        <Form
            form={form}
            layout="vertical"
            initialValues={{
                ...initialValues,
                deadline: initialValues?.deadline
                    ? dayjs(initialValues.deadline)
                    : undefined,
            }}
            onFinish={(values) => {
                onSubmit({
                    ...values,
                    deadline: values.deadline.toISOString(),
                });
                form.resetFields();
            }}
        >
            <Form.Item
                label="Title"
                name="title"
                rules={[{ required: true }]}
            >
                <Input />
            </Form.Item>

            <Form.Item label="Description" name="description">
                <Input.TextArea />
            </Form.Item>

            <Form.Item
                label="Status"
                name="status"
                rules={[{ required: true }]}
            >
            <Select
                options={[
                    { value: "TODO", label: "Todo" },
                    { value: "IN_PROGRESS", label: "In Progress" },
                    { value: "DONE", label: "Done" },
                ]}
            />
            </Form.Item>

            <Form.Item
                label="Deadline"
                name="deadline"
                rules={[{ required: true }]}
            >
                <DatePicker style={{ width: "100%" }} />
            </Form.Item>
        </Form>
    </Modal>
);
}
