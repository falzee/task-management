import UserHeader from "../components/UserHeader";
import { Outlet } from 'react-router-dom';
import { Layout } from 'antd';
const { Content } = Layout;

const UserLayout = () => {
return (
    <Layout style={{ height: '100vh'}} >
        <UserHeader />
        <Content style={{ padding: '30px 50px' }}>
            <Outlet />
        </Content>
    </Layout>
)
}

export default UserLayout;