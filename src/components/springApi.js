import React, { Component } from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Table,
  Button,
  Label,
  Input,
  FormGroup
} from "reactstrap";
import axios from "axios";

class SpringApi extends Component {
  constructor(props) {
    super(props);

    this.state = {
      employees: [],
      username: "",
      newEmployeeModal: false,
      newEmployeeData: {
        name: "",
        position: ""
      }
    };
  }

  getData = () => {
    axios.get("http://localhost:8080/users").then(response => {
      this.setState({
        employees: response.data
      });
    });
  };

  handleNameChange = event => {
    this.setState({
      newEmployeeData: {
        ...this.state.newEmployeeData,
        name: event.target.value
      }
    });
  };

  handlePositionChange = event => {
    this.setState({
      newEmployeeData: {
        ...this.state.newEmployeeData,
        position: event.target.value
      }
    });
  };

  saveEmployee = () => {
    axios
      .post("http://localhost:8080/users", this.state.newEmployeeData)
      .then(response => {
        let { employees } = this.state;
        employees.push(response.data);

        this.setState({
          employees,
          newEmployeeModal: false,
          count: 2,
          newEmployeeData: {
            name: "",
            position: ""
          }
        });

        this.getData();
      });
  };

  componentDidMount() {
    this.getData();
  }

  toggleNewEmployeeModal() {
    this.setState({
      newEmployeeModal: !this.state.newEmployeeModal
    });
  }

  render() {

    let employees = this.state.employees.map(employee => {
      return (
        <tr key={employee.id}>
          <td>{employee.id}</td>
          <td>{employee.name}</td>
          <td>{employee.position}</td>
          <td>
            <Button color="success" size="sm" className="mr-2">
              Edit
            </Button>
            <Button color="danger" size="sm">
              Delete
            </Button>
          </td>
        </tr>
      );
    });

    return (
      <div className="App container">
        <Button
          color="primary"
          onClick={this.toggleNewEmployeeModal.bind(this)}
        >
          Add New Employee
        </Button>
        <Modal
          isOpen={this.state.newEmployeeModal}
          toggle={this.toggleNewEmployeeModal.bind(this)}
        >
          <ModalHeader toggle={this.toggleNewEmployeeModal.bind(this)}>
            Add New Employee
          </ModalHeader>
          <ModalBody>
            <FormGroup>
              <Label>Employee Name</Label>
              <Input
                type="text"
                value={this.state.newEmployeeData.name}
                onChange={this.handleNameChange}
              />
            </FormGroup>

            <FormGroup>
              <Label>Position</Label>
              <Input
                type="text"
                value={this.state.newEmployeeData.position}
                onChange={this.handlePositionChange}
              />
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.saveEmployee.bind(this)}>
              Save
            </Button>{" "}
            <Button
              color="secondary"
              onClick={this.toggleNewEmployeeModal.bind(this)}
            >
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
        <Table>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Position</th>
            </tr>
          </thead>

          <tbody>{employees}</tbody>
        </Table>
      </div>
    );
  }
}

export default SpringApi;
