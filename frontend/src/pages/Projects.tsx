import React, { useCallback, useEffect } from 'react';
import { getProjects } from '../store/projects/actions.ts';
import { useAppDispatch, useAppSelector } from '../store/hooks.ts';
import { Button, Card, Col, Row, Spin, Typography } from 'antd';
import { Link } from 'react-router-dom';
import { ProjectData, ProjectState } from '../store/projects/types.ts';
import { UpOutlined } from '@ant-design/icons';
import { scrollToTop } from '../utils/scroll.ts';
import {getTasks} from "../store/tasks/actions.ts";
export const Projects: React.FC = () => {
    const dispatch = useAppDispatch();
    const projectsState: ProjectState = useAppSelector((state): ProjectState => state.projects);

    useEffect(() => {
        dispatch(getProjects());
        dispatch(getTasks());
    }, [dispatch]);

    const handleScrollToTop = useCallback((): void => {
        scrollToTop();
    }, []);

    if (projectsState.loading) {
        return <Spin size="large" style={{ display: 'block', margin: '100px auto' }} />;
    }

    if (projectsState.projects && projectsState.projects.data.length === 0) {
        return (
            <div style={{ padding: '50px', textAlign: 'center' }}>
                <Typography.Text type="secondary">Проекты не найдены</Typography.Text>
            </div>
        );
    }

    return (
        <div style={{ padding: 50, position: 'relative' }}>
            <Row gutter={[16, 16]}>
                {projectsState.projects &&
                    projectsState.projects?.data.map((project: ProjectData) => (
                        <Col key={project.id} xs={24}>
                            <Link to={`/board/${project.id}`}>
                                <Card title={project.name} hoverable>
                                    <p>{project.description}</p>
                                </Card>
                            </Link>
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
