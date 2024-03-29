import { useState, useEffect } from "react";
import { Container, ListGroup, Row, Col, Button } from "react-bootstrap";
import Loading from "../components/Loading";
import Error from "../components/Error";

const CommentsList = (props) => {
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    fetchComments();
  }, []);
  const fetchComments = async () => {
    try {
      let response = await fetch(
        "https://striveschool-api.herokuapp.com/api/comments/" + props.id,
        {
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MGFlM2YzMGNlYWY0ODAwMTVjOTE4NjkiLCJpYXQiOjE2MjI3MjA1MzAsImV4cCI6MTYyMzkzMDEzMH0.OTc-m0erU3r4uTPFifXTrLY5-jzZVD5IRHs1arBxFCc",
            "Content-type": "application/json",
          },
        }
      );
      console.log(response);
      console.log(props.id);
      setComments(await response.json());
      setIsLoading(false);

      console.log(comments);
    } catch (err) {
      console.log(err);
      setIsLoading(false);
      setIsError(true);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [props.selectedBook]);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(
        "https://striveschool-api.herokuapp.com/api/comments/" + id,
        {
          method: "DELETE",
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MGFlM2YzMGNlYWY0ODAwMTVjOTE4NjkiLCJpYXQiOjE2MjI3MjA1MzAsImV4cCI6MTYyMzkzMDEzMH0.OTc-m0erU3r4uTPFifXTrLY5-jzZVD5IRHs1arBxFCc",
            "Content-type": "application/json",
          },
        }
      );
      if (response.ok) {
        alert("comment deleted successfully");
      } else {
        alert("something went wrong with the deletion process");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div>
      {isLoading && <Loading />}
      {isError && <Error />}
      {comments.length === 0 && isLoading === false && isError === false ? (
        <p>NO Comments</p>
      ) : (
        <Container>
          <Row>
            <Col xs={12}>
              {<img src={props.image} style={{ width: "80px" }} />}

              {props.updatedComments.length > 0
                ? props.updatedComments.map((comment) => (
                    <>
                      <ListGroup key={comment.id}>
                        <ListGroup.Item>{comment.name}</ListGroup.Item>
                        <ListGroup.Item>{comment.rate}</ListGroup.Item>
                        <ListGroup.Item>{comment.comment}</ListGroup.Item>
                        <Button
                          variant="danger"
                          id="delete-btn"
                          onClick={() => handleDelete(comment._id)}
                          type="submit"
                        >
                          delete
                        </Button>
                      </ListGroup>
                    </>
                  ))
                : comments.map((comment) => (
                    <>
                      <ListGroup key={comment.id}>
                        <ListGroup.Item>{comment.name}</ListGroup.Item>
                        <ListGroup.Item>{comment.rate}</ListGroup.Item>
                        <ListGroup.Item>{comment.comment}</ListGroup.Item>
                        <Button
                          variant="danger"
                          id="delete-btn"
                          onClick={() => handleDelete(comment._id)}
                          type="submit"
                        >
                          delete
                        </Button>
                      </ListGroup>
                    </>
                  ))}
            </Col>
          </Row>
        </Container>
      )}
    </div>
  );
};
export default CommentsList;

/* 
import React, { Component } from "react";
import { Container, ListGroup, Row, Col, Button } from "react-bootstrap";
import Loading from "../components/Loading";
import Error from "../components/Error";

class CommentsList extends Component {
  state = {
    comments: [],
    isLoading: true,
    isError: false,
  };
  componentDidMount = async () => {
    this.fetchComments();
  };
  fetchComments = async () => {
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
      console.log(this.props.selected);
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
 
  componentDidUpdate = (prevProps) => {
    if (prevProps.selectedBook !== this.props.selectedBook) {
      console.log(this.props.selectedMovie);
      this.fetchComments();
    }
  };

  handleDelete = async (id) => {
    try {
      const response = await fetch(
        "https://striveschool-api.herokuapp.com/api/comments/" + id,
        {
          method: "DELETE",
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MGFlM2YzMGNlYWY0ODAwMTVjOTE4NjkiLCJpYXQiOjE2MjI3MjA1MzAsImV4cCI6MTYyMzkzMDEzMH0.OTc-m0erU3r4uTPFifXTrLY5-jzZVD5IRHs1arBxFCc",
            "Content-type": "application/json",
          },
        }
      );
      if (response.ok) {
        alert("comment deleted successfully");
        
      } else {
        alert("something went wrong with the deletion process");
      }
    } catch (error) {
      console.log(error.message);
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

                {this.props.updatedComments.length < 0
                  ? this.props.updatedComments.map((comment) => (
                      <>
                        <ListGroup key={comment.id}>
                          <ListGroup.Item>{comment.name}</ListGroup.Item>
                          <ListGroup.Item>{comment.rate}</ListGroup.Item>
                          <ListGroup.Item>{comment.comment}</ListGroup.Item>
                          <Button
                            variant="danger"
                            id="delete-btn"
                            onClick={() => this.handleDelete(comment._id)}
                            type="submit"
                          >
                            delete
                          </Button>
                        </ListGroup>
                      </>
                    ))
                  : this.state.comments.map((comment) => (
                      <>
                        <ListGroup key={comment.id}>
                          <ListGroup.Item>{comment.name}</ListGroup.Item>
                          <ListGroup.Item>{comment.rate}</ListGroup.Item>
                          <ListGroup.Item>{comment.comment}</ListGroup.Item>
                          <Button
                            variant="danger"
                            id="delete-btn"
                            onClick={() => this.handleDelete(comment._id)}
                            type="submit"
                          >
                            delete
                          </Button>
                        </ListGroup>
                      </>
                    ))}
              </Col>
            </Row>
          </Container>
        )}
      </div>
    );
  }
}
export default CommentsList;
 */
