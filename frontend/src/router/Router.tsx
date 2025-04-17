import { Navigate, Route, Routes } from 'react-router-dom';
import { Projects } from '../pages/Projects.tsx';
import { Issues } from '../pages/Issues.tsx';
import { Board } from '../pages/Board.tsx';

export const Router = () => {
    return (
        <Routes>
            <Route path='/boards' element={<Projects />} />
            <Route path='/issues' element={<Issues />} />
            <Route path='/board/:id' element={<Board />} />
            <Route path='*' element={<Navigate to='/boards' replace />} />
        </Routes>
    );
};
