import React, { Component } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import axios from "axios";
import TaskList from "./TaskList";

export default class TaskPage extends Component {

    constructor(props) {
        super(props);

        this.onChangeTaskDesc = this.onChangeTaskDesc.bind(this);
        this.onAddTask = this.onAddTask.bind(this);

        // set up state
        this.state = {
            tasks: [],
            id: randomInt(1000),
            desc: ""
        }
    }

    onChangeTaskDesc(e) {
        this.setState({ desc: e.target.value });
    }

    onAddTask(e) {
        e.preventDefault();

        const taskObject = {
            id: this.state.id,
            desc: this.state.desc
        }

        axios.post('http://localhost:3001/tasks', taskObject)
        .then(resp => console.log(resp.data));

        this.setState({
            tasks: [...this.state.tasks, taskObject],
            id: randomInt(1000),
            desc: ""
        });
    }

    componentDidMount() {
        axios.get('http://localhost:3001/tasks/')
        .then(resp => {
            this.setState({
                tasks: resp.data
            });
        })
        .catch((error) => {
            console.log(error);
        });
    }

    render = () =>
    <Container>
        <Form onSubmit={ this.onAddTask }>
            <Row className="m-3">
            <Col sm="4">
                <Form.Control type="text" 
                              placeholder="Add a new task" 
                              value={ this.state.desc } 
                              onChange={this.onChangeTaskDesc } />
            </Col>
            <Col sm="1">
                <Button type="submit" variant="primary">Add</Button>
            </Col>
            </Row>
        </Form>
        <hr/>
        <TaskList tasks={ this.state.tasks } />
    </Container>
}

function randomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}