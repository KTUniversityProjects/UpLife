import React from "react";
import { Table, Jumbotron, Container } from "react-bootstrap";
import Picture from "../Dashboard/Picture";
import imges from "../../mock_data/images.js";
import NewPostFormModal from "./NewPostFormModal";
import { makePostRequest, makeGetRequest } from "../../App/request";

class MyPosts extends React.Component {
  constructor() {
    super();
    this.state = {
      users: []
    };
  }

  componentDidMount() {
    makeGetRequest("apartment/all/" + sessionStorage.userID).then(response => {
      this.setState({
        users: response.posts
      });
    });
  }

  onSubmit(house) {
    makePostRequest("apartment/add/" + sessionStorage.userID, {
      price: house.price,
      name: house.name,
      about: house.about,
      country: house.country,
      city: house.city,
      houseNumber: house.houseNumber,
      apartmentNumber: house.apartmentNumber,
      area: house.area,
      rooms: house.rooms,
      floor: house.floor,
      floorCount: house.floorCount,
      builtYear: house.builtYear,
      startDate: house.startDate,
      duration: house.duration
    }).then(
      () => {
        window.location.reload();
      },
      () => this.setState({ errors: "Error uploading data", isLoading: false })
    );
  }

  render() {
    return (
      <Jumbotron>
        <Container fluid>
          <b>{this.state.errors}</b>
          <center>
            <h1>Your chatas</h1>
            <NewPostFormModal onSubmit={this.onSubmit} />
          </center>
          <Table responsive striped hover>
            <thead>
              <tr>
                <th>Photos</th>
                <th>Price</th>
                <th>Name</th>
                <th>Place</th>
                <th>Built year</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {this.state.users.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>{<Picture imgPaths={imges.imges.imgPaths} />}</td>
                    <td>{item.price}</td>
                    <td>{item.name}</td>
                    <td>
                      {item.country + "," + item.city + "," + item.houseNumer}
                    </td>
                    <td>{item.builtYear}</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </Container>
      </Jumbotron>
    );
  }
}

export default MyPosts;
