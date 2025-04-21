import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks.ts';
import { Button, Card, Col, Input, Modal, Row, Select, Spin, Typography } from 'antd';
import { getTaskById, getTasks } from '../store/tasks/actions.ts';
import { statusLabels, TaskData, TasksState, TaskState } from '../store/tasks/types.ts';
import { PlusOutlined, UpOutlined } from '@ant-design/icons';
import { TaskWindow } from '../components/TaskWindow.tsx';
import { scrollToTop } from '../utils/scroll.ts';

export const Issues: React.FC = () => {
    const dispatch = useAppDispatch();
    const tasksState: TaskState = useAppSelector((state): TaskState => state.tasks) as TasksState;
    const [statusFilter, setStatusFilter] = useState<string | undefined>();
    const [boardFilter, setBoardFilter] = useState<string | undefined>();
    const [titleSearch, setTitleSearch] = useState<string>('');
    const [assigneeSearch, setAssigneeSearch] = useState<string>('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedTask, setSelectedTask] = useState<TaskData | null>(null);
    const [currentId, setCurrentId] = useState(0);
    const [isModalCreateOpen, setIsModalCreateOpen] = useState(false);

    const showModal = useCallback((task: TaskData): void => {
        setCurrentId(task.id);
        setSelectedTask(task);
        setIsModalOpen(true);
    }, []);

    const handleCancel = useCallback((): void => {
        dispatch(getTasks());
        setIsModalOpen(false);
        setSelectedTask(null);
        setIsModalCreateOpen(false);
    }, [dispatch]);

    const showCreateModal = useCallback((): void => {
        setIsModalCreateOpen(true);
    }, []);

    const handleCreate = useCallback((): void => {
        dispatch(getTasks());
        setIsModalCreateOpen(false);
    }, [dispatch]);

    const handleScrollToTop = useCallback((): void => {
        scrollToTop();
    }, []);

    useEffect(() => {
        dispatch(getTasks());
    }, [dispatch]);

    const users: { label: string; value: number }[] = useMemo((): { label: string; value: number }[] => {
        return Array.from(
            new Map(
                tasksState.tasks?.data
                    .map((task: TaskData) => task.assignee)
                    .filter(Boolean)
                    .map((user) => [user.id, { label: user.fullName, value: user.id }])
            ).values()
        );
    }, [tasksState.tasks]);

    const projects: { label: string; value: number }[] = useMemo((): { label: string; value: number }[] => {
        return Array.from(
            new Map(
                tasksState.tasks?.data.map((task: TaskData) => [
                    task.boardId,
                    { label: task.boardName, value: task.boardId },
                ])
            ).values()
        );
    }, [tasksState.tasks]);

    const filteredTasks: TaskData[] | undefined = useMemo((): TaskData[] | undefined => {
        return tasksState.tasks?.data.filter((task: TaskData): boolean => {
            const statusMatch: boolean = !statusFilter || statusLabels[task.status] === statusFilter;
            const boardMatch: boolean = !boardFilter || task.boardId === Number(boardFilter);
            const titleMatch: boolean = task.title.toLowerCase().includes(titleSearch.toLowerCase());
            const assigneeMatch: boolean = task.assignee?.fullName.toLowerCase().includes(assigneeSearch.toLowerCase());
            return statusMatch && boardMatch && titleMatch && assigneeMatch;
        });
    }, [tasksState.tasks, statusFilter, boardFilter, titleSearch, assigneeSearch]);

    if (tasksState.loading) {
        return <Spin size="large" style={{ display: 'block', margin: '100px auto' }} />;
    }

    if (tasksState.tasks && tasksState.tasks.data.length === 0) {
        return (
            <div style={{ padding: '50px', textAlign: 'center' }}>
                <Typography.Text type="secondary">Задачи не найдены</Typography.Text>
            </div>
        );
    }

    return (
        <div style={{ padding: 50, position: 'relative' }}>
            <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
                <Col xs={24} sm={12} md={6}>
                    <Input
                        placeholder="Поиск по названию"
                        value={titleSearch}
                        onChange={(e) => setTitleSearch(e.target.value)}
                    />
                </Col>
                <Col xs={24} sm={12} md={6}>
                    <Input
                        placeholder="Поиск по исполнителю"
                        value={assigneeSearch}
                        onChange={(e) => setAssigneeSearch(e.target.value)}
                    />
                </Col>
                <Col xs={24} sm={12} md={6}>
                    <Select allowClear placeholder="Статус задачи" onChange={setStatusFilter} style={{ width: '100%' }}>
                        <Select.Option value="В процессе">В процессе</Select.Option>
                        <Select.Option value="Бэклог">Бэклог</Select.Option>
                        <Select.Option value="Готово">Готово</Select.Option>
                    </Select>
                </Col>
                <Col xs={24} sm={12} md={6}>
                    <Select allowClear placeholder="Доска" onChange={setBoardFilter} style={{ width: '100%' }}>
                        {tasksState.tasks?.data
                            .map((task: TaskData) => ({ id: task.boardId, name: task.boardName }))
                            .filter((v, i, a): boolean => a.findIndex((t): boolean => t.id === v.id) === i)
                            .map((board) => (
                                <Select.Option key={board.id} value={board.id}>
                                    {board.name}
                                </Select.Option>
                            ))}
                    </Select>
                </Col>
            </Row>
            <Row gutter={[16, 16]}>
                {filteredTasks?.map((task: TaskData) => (
                    <Col key={task.id} xs={24}>
                        <Card title={task.title} hoverable onClick={() => showModal(task)}>
                            <p>{task.description}</p>
                            <p>
                                <strong>Статус:</strong> {statusLabels[task.status]}
                            </p>
                            <p>
                                <strong>Исполнитель:</strong> {task.assignee.fullName || '—'}
                            </p>
                        </Card>
                    </Col>
                ))}
            </Row>
            <Modal open={isModalOpen} onCancel={handleCancel} footer={null} destroyOnClose>
                {selectedTask && (
                    <TaskWindow
                        task={selectedTask}
                        action="Редактирование"
                        users={users}
                        onClose={handleCancel}
                        onUpdate={() => dispatch(getTaskById(currentId))}
                        isFromIssues={true}
                    />
                )}
            </Modal>
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
            <Button
                type="primary"
                shape="circle"
                icon={<PlusOutlined />}
                size="large"
                style={{
                    position: 'fixed',
                    right: 100,
                    bottom: 40,
                    zIndex: 999,
                    boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
                }}
                onClick={showCreateModal}
            />
            <Modal open={isModalCreateOpen} onCancel={handleCancel} footer={null} destroyOnClose>
                <TaskWindow
                    action="Создание"
                    allUsers={users}
                    projects={projects}
                    onClose={handleCreate}
                    isFromIssues={false}
                />
            </Modal>
        </div>
    );
};
