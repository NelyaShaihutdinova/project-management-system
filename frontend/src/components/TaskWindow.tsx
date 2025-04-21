import {TaskData, TaskPriority, TaskStatus} from '../store/tasks/types.ts';
import { Button, Card, Input, Select } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { ProjectData } from '../store/projects/types.ts';
import { useAppDispatch } from '../store/hooks.ts';
import { createTask, updateTaskById } from '../store/tasks/actions.ts';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

type TaskWindowType = {
    task?: TaskData;
    action: string;
    users?: { label: string; value: number }[];
    allUsers?: { label: string; value: number }[];
    project?: ProjectData | undefined;
    projects?: { label: string; value: number }[];
    onClose: () => void;
    onUpdate?: () => void;
    isFromIssues: boolean;
};

export const TaskWindow = ({
    task,
    action,
    users,
    project,
    onClose,
    onUpdate,
    isFromIssues,
    projects,
    allUsers,
}: TaskWindowType) => {
    const dispatch = useAppDispatch();
    const [title, setTitle] = useState(task?.title);
    const [description, setDescription] = useState(task?.description);
    const [priority, setPriority] = useState(task?.priority);
    const [status, setStatus] = useState(task?.status);
    const [assignee, setAssignee] = useState(task?.assignee.id);
    const [currentProject, setCurrentProject] = useState(project);
    const navigate = useNavigate();
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    const handleGoToBoard = (boardId: number | undefined, task: TaskData | undefined | null) => {
        navigate(`/board/${boardId}`, {
            state: {
                isSelected: true,
                selectedTaskInIssues: task,
            },
        });
    };

    useEffect(() => {
        if (task) {
            setTitle(task.title);
            setDescription(task.description);
            setPriority(task.priority);
            setStatus(task.status);
            setAssignee(task.assignee?.id);
            setCurrentProject(project);
        }
    }, [task, project]);

    const validate = (): boolean => {
        const newErrors: { [key: string]: string } = {};
        if (!title?.trim()) newErrors.title = 'Введите название задачи';
        if (!description?.trim()) newErrors.description = 'Введите описание';
        if (!priority) newErrors.priority = 'Выберите приоритет';
        if (!assignee) newErrors.assignee = 'Выберите исполнителя';
        if (action === 'Создание' && !currentProject) newErrors.project = 'Выберите проект';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (): void => {
        if (!validate()) return;
        if (action === 'Создание') {
            dispatch(createTask(Number(assignee), currentProject, description, priority, title)).then(() => {
                onUpdate?.();
                onClose();
            });
        } else {
            dispatch(updateTaskById(task?.id, Number(assignee), description, priority, status, title)).then(() => {
                onUpdate?.();
                onClose();
            });
        }
    };

    return (
        <>
            {action === 'Редактирование' ? (
                <Card title="Редактирование" style={{ border: 'none' }}>
                    <div style={{ marginBottom: 12 }}>
                        <Input
                            placeholder="Название"
                            defaultValue={task?.title}
                            style={{ marginBottom: 12 }}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                        {errors.title && <div style={{ color: 'red' }}>{errors.title}</div>}
                    </div>
                    <div style={{ marginBottom: 12 }}>
                        <TextArea
                            placeholder="Описание"
                            defaultValue={task?.description}
                            rows={3}
                            style={{ marginBottom: 12 }}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                        {errors.description && <div style={{ color: 'red' }}>{errors.description}</div>}
                    </div>
                    {project && (
                        <div style={{ marginBottom: 12 }}>
                            <Select placeholder={project?.name} style={{ width: '100%', marginBottom: 12 }} disabled />
                            {errors.project && <div style={{ color: 'red' }}>{errors.project}</div>}
                        </div>
                    )}
                    <div style={{ marginBottom: 12 }}>
                        <Select
                            placeholder="Приоритет"
                            defaultValue={task?.priority}
                            style={{ width: '100%', marginBottom: 12 }}
                            options={[
                                { label: 'Low', value: 'Low' },
                                { label: 'Medium', value: 'Medium' },
                                { label: 'High', value: 'High' },
                            ]}
                            onChange={(value: TaskPriority) => setPriority(value)}
                        />
                        {errors.priority && <div style={{ color: 'red' }}>{errors.priority}</div>}
                    </div>
                    <div style={{ marginBottom: 12 }}>
                        <Select
                            placeholder="Статус"
                            defaultValue={task?.status}
                            style={{ width: '100%', marginBottom: 12 }}
                            options={[
                                { label: 'Backlog', value: 'Backlog' },
                                { label: 'In Progress', value: 'InProgress' },
                                { label: 'Done', value: 'Done' },
                            ]}
                            onChange={(value: TaskStatus) => setStatus(value)}
                        />
                    </div>
                    <div style={{ marginBottom: 12 }}>
                        <Select
                            placeholder="Исполнитель"
                            defaultValue={assignee}
                            style={{ width: '100%', marginBottom: 12 }}
                            options={users}
                            onChange={(value: number) => setAssignee(value)}
                        />
                        {errors.assignee && <div style={{ color: 'red' }}>{errors.assignee}</div>}
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Button type="primary" onClick={handleSubmit}>
                            Обновить
                        </Button>
                        {isFromIssues && (
                            <Button type="primary" onClick={() => handleGoToBoard(task?.boardId, task)}>
                                Перейти на доску
                            </Button>
                        )}
                    </div>
                </Card>
            ) : (
                <Card title="Создание" style={{ border: 'none' }}>
                    <div style={{ marginBottom: 12 }}>
                        <Input
                            placeholder="Название"
                            style={{ marginBottom: 12 }}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                        {errors.title && <div style={{ color: 'red' }}>{errors.title}</div>}
                    </div>
                    <div style={{ marginBottom: 12 }}>
                        <TextArea
                            placeholder="Описание"
                            rows={3}
                            style={{ marginBottom: 12 }}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                        {errors.description && <div style={{ color: 'red' }}>{errors.description}</div>}
                    </div>
                    <div style={{ marginBottom: 12 }}>
                        <Select
                            placeholder="Проект"
                            style={{ width: '100%', marginBottom: 12 }}
                            options={projects}
                            onChange={(value) => setCurrentProject(value)}
                        />
                        {errors.project && <div style={{ color: 'red' }}>{errors.project}</div>}
                    </div>
                    <div style={{ marginBottom: 12 }}>
                        <Select
                            placeholder="Приоритет"
                            style={{ width: '100%', marginBottom: 12 }}
                            options={[
                                { label: 'Low', value: 'Low' },
                                { label: 'Medium', value: 'Medium' },
                                { label: 'High', value: 'High' },
                            ]}
                            onChange={(value) => setPriority(value)}
                        />
                        {errors.priority && <div style={{ color: 'red' }}>{errors.priority}</div>}
                    </div>
                    <div style={{ marginBottom: 12 }}>
                        <Select
                            placeholder="Исполнитель"
                            style={{ width: '100%', marginBottom: 12 }}
                            options={allUsers}
                            onChange={(value) => setAssignee(value)}
                        />
                        {errors.assignee && <div style={{ color: 'red' }}>{errors.assignee}</div>}
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Button type="primary" onClick={handleSubmit}>
                            Создать
                        </Button>
                    </div>
                </Card>
            )}
        </>
    );
};
