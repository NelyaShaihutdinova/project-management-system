import { Button, Layout, Modal } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import React, { useCallback, useMemo, useState } from 'react';
import { TaskData, TasksState, TaskState } from '../store/tasks/types.ts';
import {useAppDispatch, useAppSelector} from '../store/hooks.ts';
import { TaskWindow } from './TaskWindow.tsx';
import {getTasks} from "../store/tasks/actions.ts";

export const AppHeader: React.FC = () => {
    const location = useLocation();
    const dispatch = useAppDispatch();
    const tasksState: TaskState = useAppSelector((state) => state.tasks) as TasksState;
    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = useCallback((): void => {
        setIsModalOpen(true);
    }, []);

    const handleCancel = useCallback((): void => {
        dispatch(getTasks());
        setIsModalOpen(false);
    }, [dispatch]);

    const users: { label: string; value: number }[] = useMemo((): { label: string; value: number }[] => {
        return Array.from(
            new Map(
                tasksState.tasks?.data
                    .map((task: TaskData) => task.assignee)
                    .filter(
                        (user): user is { id: number; fullName: string; avatarUrl: string; email: string } => !!user
                    )
                    .map((user) => [user.id, { label: user.fullName, value: user.id }])
            ).values()
        );
    }, [tasksState.tasks?.data]);

    const projects: { label: string; value: number }[] = useMemo((): { label: string; value: number }[] => {
        return Array.from(
            new Map(
                tasksState.tasks?.data.map((task: TaskData) => [
                    task.boardId,
                    { label: task.boardName, value: task.boardId },
                ])
            ).values()
        );
    }, [tasksState.tasks?.data]);

    const linkStyle = (path: string) => ({
        textDecoration: location.pathname === path ? 'underline' : 'none',
        color: 'white',
        fontWeight: location.pathname === path ? 'bold' : 'normal',
        padding: '0 16px',
        lineHeight: '64px',
    });

    return (
        <Layout.Header
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
            <Button type="primary" onClick={showModal}>
                Создать задачу
            </Button>
            <Modal open={isModalOpen} onCancel={handleCancel} footer={null} destroyOnClose>
                <TaskWindow
                    action="Создание"
                    allUsers={users}
                    projects={projects}
                    onClose={handleCancel}
                    isFromIssues={false}
                    currentBoardId={location.pathname.includes('/board') ? Number(location.pathname.split('/').pop()) : undefined}
                />
            </Modal>
        </Layout.Header>
    );
};
