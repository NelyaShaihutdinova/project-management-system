import React, { useEffect } from 'react';
import { getProjects } from '../store/projects/actions.ts';
import { useAppDispatch, useAppSelector } from '../store/hooks.ts';
import { Card, Col, Row, Spin } from 'antd';
import { Link } from 'react-router-dom';

export const Projects: React.FC = () => {
    const dispatch = useAppDispatch();
    const projectsState = useAppSelector((state) => state.projects);

    useEffect(() => {
        dispatch(getProjects());
    }, []);

    if (projectsState.loading) {
        return <Spin size="large" style={{ display: 'block', margin: '100px auto' }} />;
    }

    return (
        <div style={{ padding: 50 }}>
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
        </div>
    );
};
