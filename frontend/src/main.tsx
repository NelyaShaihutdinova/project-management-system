import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { Provider } from 'react-redux';
import { store } from './store/store.ts';
import { ConfigProvider } from 'antd';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <ConfigProvider theme={{token: { fontFamily: 'Montserrat-Regular' }}}>
            <Provider store={store}>
                <App />
            </Provider>
        </ConfigProvider>
    </StrictMode>
);
