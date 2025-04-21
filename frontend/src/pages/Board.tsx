import { Button, Card, Col, Modal, Row, Spin, Typography } from 'antd';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store/hooks.ts';
import { getTaskByProject, getTasks } from '../store/tasks/actions.ts';
import { TaskData, TasksByProjectState, TaskState } from '../store/tasks/types.ts';
import { ProjectData, ProjectState } from '../store/projects/types.ts';
import { BarChartOutlined, UpOutlined } from '@ant-design/icons';
import { TaskWindow } from '../components/TaskWindow.tsx';
import { scrollToTop } from '../utils/scroll.ts';

export const Board: React.FC = () => {
    const location = useLocation();
    const dispatch = useAppDispatch();
    const tasksState: TaskState = useAppSelector((state) => state.tasks) as TasksByProjectState;
    const projects: ProjectState = useAppSelector((state) => state.projects);
    const { id } = useParams<{ id: string }>();
    const currentProject: ProjectData | undefined = projects.projects?.data[Number(id) - 1];
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedTask, setSelectedTask] = useState<TaskData | undefined | null>(null);
    const isSelected = location.state?.isSelected;
    const selectedTaskInIssues = location.state?.selectedTaskInIssues;

    const showModal = useCallback((task: TaskData): void => {
        setSelectedTask(task);
        setIsModalOpen(true);
    }, []);

    const handleCancel = useCallback((): void => {
        dispatch(getTaskByProject(id || ''));
        setIsModalOpen(false);
        setSelectedTask(null);
    }, [dispatch, id]);

    const handleScrollToTop = useCallback((): void => {
        scrollToTop();
    }, []);

    const users: { label: string; value: number }[] = useMemo((): { label: string; value: number }[] => {
        return Array.from(
            new Map(
                tasksState.projectTasks?.data
                    .map((task: TaskData) => task.assignee)
                    .filter(Boolean)
                    .map((user) => [user.id, { label: user.fullName, value: user.id }])
            ).values()
        );
    }, [tasksState.projectTasks]);

    useEffect(() => {
        dispatch(getTaskByProject(id || ''));
        dispatch(getTasks());
    }, [dispatch, id]);

    useEffect(() => {
        if (isSelected && selectedTaskInIssues) {
            setSelectedTask(selectedTaskInIssues);
            setIsModalOpen(true);
        }
    }, [isSelected, selectedTaskInIssues]);

    if (tasksState.loading) {
        return <Spin size="large" style={{ display: 'block', margin: '100px auto' }} />;
    }

    if (tasksState.projectTasks && tasksState.projectTasks?.data.length === 0) {
        return (
            <div style={{ padding: '50px', textAlign: 'center' }}>
                <Typography.Text type="secondary">Задачи не найдены</Typography.Text>
            </div>
        );
    }

    return (
        <div style={{ padding: 24 }}>
            <Typography.Title level={1} style={{ textAlign: 'center' }}>
                {currentProject?.name}
            </Typography.Title>
            <Row gutter={16}>
                {['Backlog', 'InProgress', 'Done'].map((status: string) => (
                    <Col key={status} span={8}>
                        <Typography.Title level={4} style={{ textAlign: 'center' }}>
                            {status === 'InProgress' ? 'In Progress' : status}
                        </Typography.Title>
                        {tasksState.projectTasks?.data
                            .filter((task: TaskData): boolean => task.status === status)
                            .map((task: TaskData) => (
                                <Card
                                    key={task.id}
                                    title={task.title}
                                    hoverable
                                    style={{ marginBottom: 16 }}
                                    onClick={() => showModal(task)}
                                >
                                    <div
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'space-between',
                                        }}
                                    >
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                            <BarChartOutlined />
                                            <p style={{ margin: 0 }}>{task.priority}</p>
                                        </div>
                                        <img
                                            src={task.assignee?.avatarUrl}
                                            style={{ width: 40, height: 40, borderRadius: 20 }}
                                            alt="User Avatar"
                                        />
                                    </div>
                                </Card>
                            ))}
                        <Modal open={isModalOpen} onCancel={handleCancel} footer={null} destroyOnClose>
                            {selectedTask && (
                                <TaskWindow
                                    task={selectedTask}
                                    action="Редактирование"
                                    users={users}
                                    onClose={handleCancel}
                                    onUpdate={() => dispatch(getTaskByProject(id || ''))}
                                    isFromIssues={false}
                                />
                            )}
                        </Modal>
                    </Col>
                ))}
            </Row>
            <Button
                type="primary"
                shape="circle"
                icon={<UpOutlined />}
                size="large"
                style={{
                    position: 'fixed',
                    right: 40,
                    bottom: 40,
                    zIndex: 999,
                    boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
                }}
                onClick={handleScrollToTop}
            />
        </div>
    );
};
