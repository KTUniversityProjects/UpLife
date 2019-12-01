import React from "react";
import { Container, Form, Modal, Button } from "react-bootstrap";
import TextFieldGroup from "../common/TextFieldGroup";
import SweetAlert from "react-bootstrap-sweetalert";
import ImageUploader from "react-images-upload";

class NewPostFormModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      //FORM CREDENTIALS
      price: 0,
      name: "",
      about: "",
      country: "",
      city: "",
      houseNumber: 0,
      apartmentNumber: 0,
      area: 0,
      rooms: 0,
      floor: 0,
      floorCount: 0,
      builtYear: "",
      startDate: "",
      duration: 0,
      imgPaths: "",
      show: false,
      pictures: [],
      picturesURL: [],
      alert: null
    };
    this.onDrop = this.onDrop.bind(this);
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onDrop(pictureFiles, pictureDataURLs) {
    this.setState({
      pictures: pictureFiles,
      picturesURL: pictureDataURLs
    });
  }

  handleClose() {
    this.setState({
      price: 0,
      name: "",
      about: "",
      country: "",
      city: "",
      houseNumber: 0,
      apartmentNumber: 0,
      area: 0,
      rooms: 0,
      floor: 0,
      floorCount: 0,
      builtYear: "",
      startDate: "",
      duration: 0,
      imgPaths: "",
      show: false,
      pictures: [],
      picturesURL: [],
      alert: null
    });
  }

  handleSubmit() {
    let data = {
      price: this.state.price,
      name: this.state.name,
      about: this.state.about,
      country: this.state.country,
      city: this.state.city,
      apartmentNumber: this.state.apartmentNumber,
      houseNumber: this.state.houseNumber,
      area: this.state.area,
      rooms: this.state.rooms,
      floor: this.state.floor,
      floorCount: this.state.floorCount,
      builtYear: this.state.builtYear,
      startDate: this.state.startDate,
      duration: this.state.duration,
      imgPaths: this.state.imgPaths,
      pictures: this.state.pictures,
      picturesURL: this.state.picturesURL
    };
    this.props.onSubmit(data);
    const getAlert = () => (
      <SweetAlert
        success
        title="Submitted!"
        onConfirm={() => {
          this.setState({ alert: null });
        }}
      />
    );
    this.setState({
      alert: getAlert(),
      show: false,
      //FORM CREDENTIALS
      price: 0,
      name: "",
      about: "",
      country: "",
      city: "",
      houseNumber: 0,
      apartmentNumber: 0,
      area: 0,
      rooms: 0,
      floor: 0,
      floorCount: 0,
      builtYear: "",
      startDate: "",
      duration: 0,
      imgPaths: ""
    });
  }

  handleShow() {
    this.setState({ show: true });
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    return (
      <>
        <Button block variant="success" onClick={this.handleShow}>
          Add a new post
        </Button>
        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Add new post</Modal.Title>
          </Modal.Header>
          <Form>
            <TextFieldGroup
              label="Price"
              onChange={this.onChange}
              value={this.state.price}
              field="price"
              type="number"
            />
            <TextFieldGroup
              label="Name"
              onChange={this.onChange}
              value={this.state.name}
              field="name"
            />
            <TextFieldGroup
              label="About"
              onChange={this.onChange}
              value={this.state.about}
              field="about"
            />
            <TextFieldGroup
              label="Country"
              onChange={this.onChange}
              value={this.state.country}
              field="country"
            />
            <TextFieldGroup
              label="City"
              onChange={this.onChange}
              value={this.state.city}
              field="city"
            />
            <TextFieldGroup
              label="HouseNumber"
              onChange={this.onChange}
              value={this.state.houseNumber}
              field="houseNumber"
              type="number"
            />
            <TextFieldGroup
              label="ApartmentNumber"
              onChange={this.onChange}
              value={this.state.apartmentNumber}
              field="apartmentNumber"
              type="number"
            />
            <TextFieldGroup
              label="Area"
              onChange={this.onChange}
              value={this.state.area}
              field="area"
              type="number"
            />
            <TextFieldGroup
              label="Rooms"
              onChange={this.onChange}
              value={this.state.rooms}
              field="rooms"
              type="number"
            />
            <TextFieldGroup
              label="Floor"
              onChange={this.onChange}
              value={this.state.floor}
              field="floor"
              type="number"
            />
            <TextFieldGroup
              label="FloorCount"
              onChange={this.onChange}
              value={this.state.floorCount}
              field="floorCount"
              type="number"
            />
            <TextFieldGroup
              label="BuiltYear"
              onChange={this.onChange}
              value={this.state.builtYear}
              field="builtYear"
              type="date"
            />
            <TextFieldGroup
              label="StartDate"
              onChange={this.onChange}
              value={this.state.startDate}
              field="startDate"
              type="date"
            />
            <TextFieldGroup
              label="Duration"
              onChange={this.onChange}
              value={this.state.duration}
              field="duration"
              type="number"
            />
          </Form>
          <Container>
            {this.state.picturesURL.map((item, index) => {
              return (
                <img
                  key={index}
                  src={item}
                  alt={item}
                  style={{ width: "100px", height: "100px", display: "inline" }}
                />
              );
            })}
          </Container>
          <ImageUploader
            buttonText="Choose images"
            onChange={this.onDrop}
            imgExtension={[".jpg", ".gif", ".png", ".gif"]}
            maxFileSize={5242880}
          />
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={this.handleSubmit}>
              Submit
            </Button>
          </Modal.Footer>
        </Modal>
        {this.state.alert}
      </>
    );
  }
}

export default NewPostFormModal;
