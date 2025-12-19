import { Layout } from 'antd';
import { Link } from 'react-router-dom';
import { useAuth } from "../context/useAuth"; 
const { Header } = Layout;

const MainHeader = () => {
    const { logout } = useAuth();

    const handleLogout = () => {
        logout();
    };
return (
<Header style={{ }}>
    <div className="login-header" style={{  
            display: 'flex', 
            alignItems: 'center', 
        }}>
        <Link to='/home' style={{  
            display: 'flex', 
            alignItems: 'center',
            color:'white'
        }}>
            <h2>LOGO</h2>
        </Link>
        <Link style={{color:'white', marginLeft:'20px'}} to='/tasks'>Tasks</Link>
        <Link style={{color:'white', marginLeft:'auto'}} to='/' onClick={handleLogout}>Logout</Link>

    </div>
</Header>
)
}

export default MainHeader;