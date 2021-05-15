import './App.css';
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { Component } from 'react';
import { Table } from 'reactstrap';

const url = "http://127.0.0.1:8000/api";
const mostrarGrid = false;
const Activity = 0;
class App extends Component {
  state = {
    data: [],
    dates: [],
    modalInsertar: false,
    modalInsertarDates: false,
    form: {
      id: 0,
      title: '',
      description: '',
      tipoModal: '',
    },
    formDate: {
      id: 0,
      date: '',
      hours: '',
      activity_id: 0,
      tipoModalDate: '',
    }
  }
  modalInsertar = () => {
    this.setState({ modalInsertar: !this.state.modalInsertar });
  }
  modalInsertarDates = () => {
    this.setState({ modalInsertarDates: !this.state.modalInsertarDates });
  }
  getActivities = () => {
    axios.get(url + "/getActivities").then(response => {
      this.setState({ data: response.data });
    }).catch(error => {
      console.log(error.message);
    });
  }
  getDateId = (id) => {
    this.Activity = id;
    axios.get(url + "/getDateId/" + id).then(response => {
      this.setState({ dates: response.data });
    }).catch(error => {
      console.log(error.message);
    });
    this.mostrarGrid = true;
  }
  deleteDates(id) {
    axios.delete(url + "/deleteDates/" + id).then(response => {
      this.getDateId(this.Activity);
      alert(response.data);
    }).catch(error => {
      console.log(error.message);
    });
  }
  deleteActivities(id) {
    axios.delete(url + "/deleteActivities/" + id).then(response => {
      this.getActivities();
      alert(response.data);
    }).catch(error => {
      console.log(error.message);
    });
  }
  createActivities = () => {
    delete this.state.form.id;
    axios.post(url + "/createActivities", this.state.form).then(response => {
      this.getActivities();
      this.modalInsertar();
      alert(response.data);
    }).catch(error => {
      console.log(error.message);
    });
  }
  updateActivities = () => {
    axios.put(url + "/updateActivities", this.state.form).then(response => {
      this.getActivities();
      this.modalInsertar();
      alert(response.data);
    }).catch(error => {
      console.log(error.message);
    });
  }
  createDates = () => {
    this.state.formDate.activity_id = this.Activity;
    delete this.state.formDate.id;
    console.log(this.state.formDate);
    axios.post(url + "/createDates", this.state.formDate).then(response => {
      this.getDateId(this.Activity);
      alert(response.data);
    }).catch(error => {
      console.log(error.message);
    });
    this.modalInsertarDates();
  }
  updateDates = () => {
    this.state.formDate.activity_id = this.Activity;
    axios.put(url + "/updateDates", this.state.formDate).then(response => {
      this.getDateId(this.Activity);
      alert(response.data);
    }).catch(error => {
      console.log(error.message);
    });
    this.modalInsertarDates();
  }
  handleChange = async e => {
    e.persist();
    await this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value
      }
    });
  }
  handleChangeDates = async e => {
    e.persist();
    await this.setState({
      formDate: {
        ...this.state.formDate,
        [e.target.name]: e.target.value
      }
    });
  }
  componentDidMount() {
    this.getActivities();
  }
  selectActivity = (activity) => {
    this.setState({
      tipoModal: 'actualizar',
      form: {
        id: activity.id,
        title: activity.title,
        description: activity.description,
      }
    });
  }
  selectDate = (date) => {
    this.setState({
      tipoModalDate: 'actualizar',
      formDate: {
        id: date.id,
        date: date.date,
        hours: date.hours,
        activity_id: date.activity_id,
      }
    });
  }
  render() {
    const { form } = this.state;
    const { formDate } = this.state;
    return (
      <div className="cont">
        <div className="container">
          <h5>Actividades</h5>
          <Table hover>
            <thead>
              <tr>
                <th>Id</th>
                <th>Titulo</th>
                <th>Descripción</th>
                <th>
                  <button className="btn btn-success" onClick={() => { this.setState({ form: null, tipoModal: 'insertar' }); this.modalInsertar(); }}>
                    Registrar actividad
                  </button>
                </th>
              </tr>
            </thead>
            <tbody>
              {this.state.data.map(activities => {
                return (
                  <tr>
                    <th scope="row">{activities.id}</th>
                    <td>{activities.title}</td>
                    <td>{activities.description}</td>
                    <td>
                      <button className="btn btn-primary" onClick={() => { this.selectActivity(activities); this.modalInsertar(); }}>
                        <FontAwesomeIcon icon={faEdit} />
                      </button>
                      <button className="btn btn-danger" onClick={() => this.deleteActivities(activities.id)}>
                        <FontAwesomeIcon icon={faTrashAlt} />
                      </button>
                      <button className="btn btn-info" style={{ color: "#fff" }} onClick={() => this.getDateId(activities.id)}>
                        {/* <FontAwesomeIcon icon={FaAngleDoubleRight} /> */}
                        Agregar horas
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
          {/* Tabla de Fechas y horas */}
          {
            this.mostrarGrid
              ? <Table hover>
                <thead>
                  <tr>
                    <th>Id</th>
                    <th>Fecha</th>
                    <th>Horas</th>
                    <th>Actividad</th>
                    <th>
                      <button className="btn btn-success" onClick={() => { this.setState({ formDate: null, tipoModalDate: 'insertar' }); this.modalInsertarDates(); }}>
                        Registrar horas
                  </button>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.dates.map(date => {
                    return (
                      <tr>
                        <th scope="row">{date.id}</th>
                        <td>{date.date}</td>
                        <td>{date.hours}</td>
                        <td>{date.activity_id}</td>
                        <td>
                          <button className="btn btn-primary">
                            <FontAwesomeIcon icon={faEdit} onClick={() => { this.selectDate(date); this.modalInsertarDates(); }} />
                          </button>
                          <button className="btn btn-danger" onClick={() => this.deleteDates(date.id)}>
                            <FontAwesomeIcon icon={faTrashAlt} />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
              : <div></div>
          }
          {/* Modal insertar & editar */}
          <Modal isOpen={this.state.modalInsertar}>
            <ModalHeader style={{ display: 'block' }}>
              <span style={{ float: 'right' }} onClick={() => this.modalInsertar()}>x</span>
            </ModalHeader>
            <ModalBody>
              <div className="form-group">
                <label htmlFor="id">Id</label>
                <input disabled className="form-control" type="text" name="id" id="id" onChange={this.handleChange} value={form ? form.id : this.state.data.length + 1} />
                <label htmlFor="title">Titulo</label>
                <input className="form-control" type="text" name="title" id="title" onChange={this.handleChange} value={form ? form.title : ''} />
                <br />
                <label htmlFor="description">Descripcion</label>
                <input className="form-control" type="text" name="description" id="description" onChange={this.handleChange} value={form ? form.description : ''} />
              </div>
            </ModalBody>
            <ModalFooter>
              {this.state.tipoModal === 'insertar' ?
                <button className="btn btn-success" onClick={() => this.createActivities()}>
                  Insertar
                </button>
                :
                <button className="btn btn-primary" onClick={() => this.updateActivities()}>
                  Actualizar
                </button>
              }
              <button className="btn btn-danger" onClick={() => this.modalInsertar()}>Cancelar</button>
            </ModalFooter>
          </Modal>
          {/* <Modal isOpen={this.state.modalEliminar}>
            <ModalBody>
              Estás seguro que deseas eliminar a la empresa {form && form.nombre}
            </ModalBody>
            <ModalFooter>
              <button className="btn btn-danger" onClick={() => this.peticionDelete()}>Sí</button>
              <button className="btn btn-secundary" onClick={() => this.setState({ modalEliminar: false })}>No</button>
            </ModalFooter>
          </Modal> */}
          {/* Modal Fechas y horas */}
          <Modal isOpen={this.state.modalInsertarDates}>
            <ModalHeader style={{ display: 'block' }}>
              <span style={{ float: 'right' }} onClick={() => this.modalInsertarDates()}>x</span>
            </ModalHeader>
            <ModalBody>
              <div className="form-group">
                <label htmlFor="id">Id</label>
                <input disabled className="form-control" type="text" name="id" id="id" onChange={this.handleChangeDates} value={formDate ? formDate.id : this.state.data.length + 1} />
                <label htmlFor="date">Fecha</label>
                <input className="form-control" type="date" name="date" id="date" onChange={this.handleChangeDates} value={formDate ? formDate.date : ''} />
                <br />
                <label htmlFor="hours">Horas</label>
                <input className="form-control" type="number" name="hours" id="hours" onChange={this.handleChangeDates} value={formDate ? formDate.hours : ''} />
                <label htmlFor="activity_id">Actividad</label>
                <input disabled className="form-control" type="text" name="activity_id" id="activity_id" onChange={this.handleChangeDates} value={formDate ? formDate.activity_id : this.Activity} />
              </div>
            </ModalBody>
            <ModalFooter>
              {this.state.tipoModalDate === 'insertar' ?
                <button className="btn btn-success" onClick={() => this.createDates()}>
                  Insertar
               </button>
                :
                <button className="btn btn-primary" onClick={() => this.updateDates()}>
                  Actualizar
               </button>
              }
              <button className="btn btn-danger" onClick={() => this.modalInsertarDates()}>Cancelar</button>
            </ModalFooter>
          </Modal>
        </div>
      </div>
    );
  }
}
export default App;