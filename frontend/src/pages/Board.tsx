import {Button, Card, Col, Row, Spin, Typography} from "antd";
import React, {useEffect} from 'react';
import {useParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../store/hooks.ts";
import {getTaskByProject} from "../store/tasks/actions.ts";
import {TasksState, TaskState} from "../store/tasks/types.ts";
import {ProjectData, ProjectState} from "../store/projects/types.ts";
import {UpOutlined, BarChartOutlined} from "@ant-design/icons";
import {scrollToTop} from "./Issues.tsx";

export const Board: React.FC = () => {
    const dispatch = useAppDispatch();
    const tasksState: TaskState = useAppSelector((state) => state.tasks) as TasksState;
    const projects: ProjectState = useAppSelector((state) => state.projects);
    const {id} = useParams<{ id: string }>();
    const currentProject: ProjectData | undefined = projects.projects?.data[Number(id) - 1];

    useEffect(() => {
        dispatch(getTaskByProject(id || ""));
    }, [dispatch, id]);

    if (tasksState.loading) {
        return <Spin size="large" style={{display: "block", margin: "100px auto"}}/>;
    }

    return (
        <div style={{padding: 24}}>
            <Typography.Title level={1} style={{textAlign: "center"}}>{currentProject?.name}</Typography.Title>
            <Row gutter={16}>
                {["Backlog", "InProgress", "Done"].map((status) => (
                    <Col key={status} span={8}>
                        <Typography.Title level={4} style={{textAlign: "center"}}>
                            {status === "InProgress" ? "In Progress" : status}
                        </Typography.Title>
                        {tasksState.tasks?.data.filter((task) => task.status === status).map((task) => (
                            <Card key={task.id} title={task.title} hoverable style={{marginBottom: 16}}>
                                <div style={{display: "flex", alignItems: "center", justifyContent: "space-between"}}>
                                    <div style={{display: "flex", alignItems: "center", gap: 8}}>
                                        <BarChartOutlined/>
                                        <p style={{margin: 0}}>{task.priority}</p>
                                    </div>
                                    <img src={task.assignee.avatarUrl}
                                         style={{width: 40, height: 40, borderRadius: 20}} alt="User Avatar"/>
                                </div>
                            </Card>
                        ))}
                    </Col>
                ))}
            </Row>
            <Button
                type="primary"
                shape="circle"
                icon={<UpOutlined/>}
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
