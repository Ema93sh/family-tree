import React from "react";
import {Modal, Button, Input, Form} from "react-bootstrap";
import Person from "../models/person.es6.js";
import {Male, Female} from "../models/symbols.es6.js";

class AddHumanView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          showModal: true,
          sex: "male",
          name: ""
        };
    }

    close() {
        this.setState({showModal: false});
    }

    add() {
        let sex = this.state.sex === "male" ? Male : Female;
        let newPerson = new Person(this.state.name, sex);
        this.props.onAdd(newPerson, this.props.withHuman, this.props.relationship);
        this.close();
    }

    handleChange(e) {
        var newState = {};
        newState[e.target.name] = e.target.value;
        this.setState(newState);
    }

    render() {
        return (
          <Modal show={this.state.showModal} onHide={this.close.bind(this)}>
              <Modal.Header closeButton>
                <Modal.Title>Add Human to Family</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Input type="text" value={this.state.name} onChange={this.handleChange.bind(this)} name="name" label="Name" placeholder="Enter the name of the person" />
                <Input name="sex" type="radio" value="male" label="Male" onChange={this.handleChange.bind(this)}/>
                <Input name="sex" type="radio" value="female" label="Female" onChange={this.handleChange.bind(this)}/>
              </Modal.Body>
              <Modal.Footer>
                <Button onClick={this.add.bind(this)}>Add</Button>
                <Button onClick={this.close.bind(this)}>Close</Button>
              </Modal.Footer>
          </Modal>
        );
    }
}

export default AddHumanView;
