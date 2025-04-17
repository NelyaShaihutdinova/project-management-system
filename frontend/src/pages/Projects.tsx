import React, { useEffect } from 'react';
import { getProjects } from '../store/projects/actions.ts';
import { useAppDispatch, useAppSelector } from '../store/hooks.ts';
import { Button, Card, Col, Row, Spin } from 'antd';
import { Link } from 'react-router-dom';
import { ProjectState } from '../store/projects/types.ts';
import { UpOutlined } from '@ant-design/icons';
import { scrollToTop } from './Issues.tsx';

export const Projects: React.FC = () => {
    const dispatch = useAppDispatch();
    const projectsState: ProjectState = useAppSelector((state) => state.projects);

    useEffect(() => {
        dispatch(getProjects());
    }, []);

    if (projectsState.loading) {
        return <Spin size="large" style={{ display: 'block', margin: '100px auto' }} />;
    }

    return (
        <div style={{ padding: 50, position: 'relative' }}>
            <Row gutter={[16, 16]}>
                {projectsState.projects &&
                    projectsState.projects.data.map((project) => (
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
                onClick={scrollToTop}
            />
        </div>
    );
};
