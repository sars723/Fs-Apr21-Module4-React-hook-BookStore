import React, { Component } from "react";
import { Container, ListGroup, Row, Col } from "react-bootstrap";
import Loading from "../components/Loading";
import Error from "../components/Error";

class CommentsList extends Component {
  state = {
    comments: [],
    isLoading: true,
    isError: false,
  };
  componentDidMount = async () => {
    try {
      let response = await fetch(
        "https://striveschool-api.herokuapp.com/api/comments/" + this.props.id,
        {
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MGFlM2YzMGNlYWY0ODAwMTVjOTE4NjkiLCJpYXQiOjE2MjI3MjA1MzAsImV4cCI6MTYyMzkzMDEzMH0.OTc-m0erU3r4uTPFifXTrLY5-jzZVD5IRHs1arBxFCc",
            "Content-type": "application/json",
          },
        }
      );
      console.log(response);
      this.setState({
        comments: await response.json(),
        isLoading: false,
      });
      console.log(this.state.comments);
    } catch (err) {
      console.log(err);
      this.setState({ isLoading: false, isError: true });
    }
  };
  render() {
    return (
      <div>
        {this.state.isLoading && <Loading />}
        {this.state.isError && <Error />}
        {this.state.comments.length === 0 &&
        this.state.isLoading === false &&
        this.state.isError === false ? (
          <p>NO Comments</p>
        ) : (
          <Container>
            <Row>
              <Col xs={12}>
                {<img src={this.props.image} style={{ width: "120px" }} />}
                <ListGroup>
                  {/* filter((book, i) => i < 12) */}
                  {this.state.comments
                    .filter((comment, i) => i < 3)
                    .map((comment) => (
                      <>
                        {/*  <ListGroup.Item key={comment.id}>
                          {<img src={this.props.image} />}
                        </ListGroup.Item> */}
                        <ListGroup.Item key={comment.id}>
                          {comment.name}
                        </ListGroup.Item>
                        <ListGroup.Item key={comment.id}>
                          {comment.rate}
                        </ListGroup.Item>
                        <ListGroup.Item key={comment.id}>
                          {comment.comment}
                        </ListGroup.Item>
                      </>
                    ))}
                </ListGroup>
              </Col>
            </Row>
          </Container>
        )}
      </div>
    );
  }
}
export default CommentsList;