import type { FormProps } from 'antd';
import { Button, Form, Input, message } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/useAuth';
import api from "../services/api";

type FieldType = {
    name?: string;
    username?: string;
    email?: string;
    password?: string;
};
interface ApiError {
    response?: {
        data?: {
            message?: string;
        };
    };
}

function Register() {
    const validateEmail = async (_rule:unknown, value: string) => {
        const regRules = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!regRules.test(value)) {
            return Promise.reject('Input must be an email!');
        }
        return Promise.resolve();
    };
    
    const { login } = useAuth();
    const navigate = useNavigate();

    const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
        try {
            const res = await api.post("/auth/register", values);

            const token = res.data.token; 
            login(token); 

            message.success("User registration success, please login!");
            navigate("/login"); 
        } catch (err: unknown) {
            const error = err as ApiError;
            message.error(error.response?.data?.message || "User registration failed!");
        }
    };


    return (
    <div className='regis-page' style={{ display: 'flex', flexDirection:'column', justifyContent: 'center',alignItems:'center', height: '100vh', width: '100vw' }}>  
        <h1 style={{ textAlign:'center',marginBottom:'10px'}}>Register</h1>
        <Form
            name="basic"
            style={{ maxWidth: 900 }}
            initialValues={{ remember: true }}
            layout='vertical'
            onFinish={onFinish}
            autoComplete="off"
        >
            
            <Form.Item<FieldType>
                label="Name"
                name="name"
                rules={[{ required: true, message: 'Please input your name!' }]}
            >
                <Input />
            </Form.Item>
            <Form.Item<FieldType>
                label="Username"
                name="username"
                rules={[{ required: true, message: 'Please input your username!' }]}
            >
                <Input />
            </Form.Item>
            <Form.Item<FieldType>
                label="e-mail"
                name="email"
                rules={[
                    { required: true, message: 'Please input your email!' },
                    { validator:validateEmail }
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item<FieldType>
                label="Password"
                name="password"
                rules={[
                    { required: true, message: 'Please input your password!' },
                    { min: 8, message: 'Password must at least 8 character!' },
                ]}
            >
                <Input.Password />
            </Form.Item>

            <Form.Item label={null}>
                <Button type="primary" htmlType="submit">
                    Register
                </Button>
            </Form.Item>
        </Form>
        <p>Already have an account? login <Link to='/login'>here</Link></p>
    </div>
    )
}

export default Register