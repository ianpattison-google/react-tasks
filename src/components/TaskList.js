import React, { Component } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import axios from "axios";
import TaskItem from "./TaskItem";

export default class TaskList extends Component {

    constructor(props) {
        super(props);
    }

    render = () =>
    <Container>
        { this.props.tasks.map(task => (
            <TaskItem task={ task } />
        ))}
        <hr/>
    </Container>
}
