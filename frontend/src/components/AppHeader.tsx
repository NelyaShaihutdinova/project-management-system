import {Button, Layout} from 'antd';
import { Link, useLocation } from 'react-router-dom';

const { Header } = Layout;

export const AppHeader = () => {
    const location = useLocation();

    const linkStyle = (path: string) => ({
        color: location.pathname === path ? '#8d8d8e' : 'white',
        fontWeight: location.pathname === path ? 'bold' : 'normal',
        padding: '0 16px',
        textDecoration: 'none',
        lineHeight: '64px',
    });

    return (
        <Header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
            <div style={{ display: 'flex', gap: '20px' }}>
                <Link to='/issues' style={linkStyle('/issues')}>
                    Все задачи
                </Link>
                <Link to='/boards' style={linkStyle('/boards')}>
                    Проекты
                </Link>
            </div>
            <Button type="primary">Создать задачу</Button>
        </Header>
    );
};
