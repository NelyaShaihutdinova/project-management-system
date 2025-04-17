import { Button, Layout } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import React from 'react';

const { Header } = Layout;

export const AppHeader: React.FC = () => {
    const location = useLocation();

    const linkStyle = (path: string) => ({
        textDecoration: location.pathname === path ? 'underline' : 'none',
        color: 'white',
        fontWeight: location.pathname === path ? 'bold' : 'normal',
        padding: '0 16px',
        lineHeight: '64px',
    });

    return (
        <Header
            style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: '100%',
                position: 'fixed',
                top: '0',
                left: '0',
                right: '0',
                zIndex: '1000',
            }}
        >
            <div style={{ display: 'flex', gap: '20px' }}>
                <Link to="/issues" style={linkStyle('/issues')}>
                    Все задачи
                </Link>
                <Link to="/boards" style={linkStyle('/boards')}>
                    Проекты
                </Link>
            </div>
            <Button type="primary">Создать задачу</Button>
        </Header>
    );
};
