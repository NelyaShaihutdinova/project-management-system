import { BrowserRouter } from 'react-router-dom';
import { Layout } from 'antd';
import { AppHeader } from './components/AppHeader.tsx';
import { Router } from './router/Router.tsx';

const { Content } = Layout;

function App() {
    return (
        <BrowserRouter>
            <Layout style={{ minHeight: '100vh', width: '100%', fontFamily: 'Montserrat-Regular' }}>
                <AppHeader />
                <Content style={{ padding: '24px', width: '100%' }}>
                    <Router />
                </Content>
            </Layout>
        </BrowserRouter>
    );
}

export default App;
