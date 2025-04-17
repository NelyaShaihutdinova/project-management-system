import { BrowserRouter } from 'react-router-dom';
import { Layout } from 'antd';
import { AppHeader } from './components/AppHeader.tsx';
import { Router } from './router/Router.tsx';
import React from 'react';

export const SERVER_API_URL: string = 'http://localhost:8080/api/v1';
const { Content } = Layout;

export const App: React.FC = () => {
    return (
        <BrowserRouter>
            <Layout style={{ minHeight: '100vh', width: '100%' }}>
                <AppHeader />
                <Content style={{ padding: '24px', width: '100%', paddingTop: '30px' }}>
                    <Router />
                </Content>
            </Layout>
        </BrowserRouter>
    );
};

export default App;
