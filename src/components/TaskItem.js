import React, { Component } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import axios from "axios";

export default class TaskItem extends Component {

    constructor(props) {
        super(props);
    }

    onDeleteTask(e) {
    }

    render = () =>
    <Row className="m-3">
        <Col sm="4">
            { this.props.task.desc }
        </Col>
        <Col sm="1">
            <Button type="button" variant="danger">Delete</Button>
        </Col>
    </Row>
}