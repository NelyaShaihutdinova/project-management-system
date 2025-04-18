import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks.ts';
import { Button, Card, Col, Input, Row, Select, Spin } from 'antd';
import { getTasks } from '../store/tasks/actions.ts';
import {statusLabels, TaskData, TasksState, TaskState} from '../store/tasks/types.ts';
import { PlusOutlined, UpOutlined } from '@ant-design/icons';

export const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
};

export const Issues: React.FC = () => {
    const dispatch = useAppDispatch();
    const tasksState: TaskState = useAppSelector((state) => state.tasks) as TasksState;
    const [statusFilter, setStatusFilter] = useState<string | undefined>();
    const [boardFilter, setBoardFilter] = useState<string | undefined>();
    const [titleSearch, setTitleSearch] = useState<string>('');
    const [assigneeSearch, setAssigneeSearch] = useState<string>('');

    useEffect(() => {
        dispatch(getTasks());
    }, []);

    if (tasksState.loading) {
        return <Spin size="large" style={{ display: 'block', margin: '100px auto' }} />;
    }

    const filteredTasks = tasksState.tasks?.data.filter((task: TaskData) => {
        const statusMatch = !statusFilter || statusLabels[task.status] === statusFilter;
        const boardMatch = !boardFilter || task.boardId === Number(boardFilter);
        const titleMatch = task.title.toLowerCase().includes(titleSearch.toLowerCase());
        const assigneeMatch = task.assignee?.fullName.toLowerCase().includes(assigneeSearch.toLowerCase());
        return statusMatch && boardMatch && titleMatch && assigneeMatch;
    });

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
                            .map((task) => ({ id: task.boardId, name: task.boardName }))
                            .filter((v, i, a) => a.findIndex((t) => t.id === v.id) === i) // уникальные доски
                            .map((board) => (
                                <Select.Option key={board.id} value={board.id}>
                                    {board.name}
                                </Select.Option>
                            ))}
                    </Select>
                </Col>
            </Row>
            <Row gutter={[16, 16]}>
                {filteredTasks?.map((task) => (
                    <Col key={task.id} xs={24}>
                        <Card title={task.title} hoverable>
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
                onClick={scrollToTop}
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
                onClick={() => {}}
            />
        </div>
    );
};
