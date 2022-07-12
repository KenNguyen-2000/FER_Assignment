import React, { Component, useState } from "react";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  Breadcrumb,
  BreadcrumbItem,
  Row,
  Label,
  Col,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
} from "reactstrap";
import { Link } from "react-router-dom";
import { Control, Errors, LocalForm } from "react-redux-form";

function RenderDish({ dish }) {
  return (
    <Card>
      <CardImg top src={dish.image} alt={dish.name} />
      <CardBody>
        <CardTitle>{dish.name}</CardTitle>
        <CardText>{dish.description}</CardText>
      </CardBody>
    </Card>
  );
}

function RenderComments({ comments }) {
  return (
    <div>
      <h4>Comments</h4>
      <ul className="list-unstyled">
        {comments.map((comment) => {
          return (
            <div key={comment.id}>
              <li>{comment.comment}</li>
              <li>{`-- ${comment.author}, ${new Intl.DateTimeFormat("en-US", {
                year: "numeric",
                month: "short",
                day: "2-digit",
              }).format(new Date(Date.parse(comment.date)))}`}</li>
            </div>
          );
        })}
      </ul>
    </div>
  );
}

function CommentForm() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [yourname, setYourname] = useState("");
  const [comment, setComment] = useState("");
  const [message, setMessage] = useState("");
  const [valid, setValid] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleSubmit = (values) => {
    toggleModal();
  };

  const validate = (val) => {
    if (val?.length >= 3 && val?.length <= 15) {
      setMessage("");
      setValid(true);
      return true;
    } else if (val?.length === 0 || val === undefined) {
      setMessage("Required");
      setValid(false);
      return false;
    } else if (val?.length < 3) {
      setMessage("Your name must be greater or equal 3 characters");
      setValid(false);
      return false;
    } else if (val?.length > 15) {
      setMessage("Your name must be  smaller or equal 15 characters!");
      setValid(false);
      return false;
    }
  };

  return (
    <div>
      <Button type="submit" color="primary" onClick={toggleModal}>
        Submit Comment
      </Button>
      <Modal isOpen={isModalOpen} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>Login</ModalHeader>
        <ModalBody>
          <LocalForm onSubmit={() => handleSubmit()}>
            <Row className="form-group">
              <Label htmlFor="rating" md={12}>
                Rating
              </Label>
              <Col md={12}>
                <Control.select
                  type="number"
                  model=".rating"
                  id="rating"
                  name="rating"
                  className="form-control"
                  onChange={(e) => setRating(e.target.value)}
                >
                  <option value={1}>1</option>
                  <option value={2}>2</option>
                  <option value={3}>3</option>
                  <option value={4}>4</option>
                  <option value={5}>5</option>
                </Control.select>
              </Col>
            </Row>
            <Row className="form-group">
              <Label htmlFor="yourname" md={12}>
                Your Name
              </Label>
              <Col md={12}>
                <Control.text
                  model=".yourname"
                  id="yourname"
                  name="yourname"
                  placeholder="Your Name"
                  className="form-control"
                  onChange={(e) => setYourname(e.target.value)}
                  validators={{
                    validate,
                  }}
                />
              </Col>
              <Col md={12}>
                <Errors
                  style={{ color: "red" }}
                  model=".yourname"
                  show="touched"
                  messages={{
                    validate: message,
                  }}
                />
              </Col>
            </Row>
            <Row className="form-group">
              <Label htmlFor="comment" md={12}>
                Comment
              </Label>
              <Col md={12}>
                <Control.textarea
                  model=".comment"
                  id="comment"
                  name="comment"
                  placeholder="Comment"
                  className="form-control"
                  rows="6"
                  onChange={(e) => setComment(e.target.value)}
                />
              </Col>
            </Row>
            <Row className="form-group">
              <Col md={{ size: 10 }}>
                <Button type="submit" color="primary" disabled={!valid}>
                  Submit
                </Button>
              </Col>
            </Row>
          </LocalForm>
        </ModalBody>
      </Modal>
    </div>
  );
}

const DishDetail = (props) => {
  if (props.dish) {
    return (
      <div className="container">
        <div className="row">
          <Breadcrumb>
            <BreadcrumbItem>
              <Link to="/menu">Menu</Link>
            </BreadcrumbItem>
            <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
          </Breadcrumb>
          <div className="col-12">
            <h3>{props.dish.name}</h3>
            <hr />
          </div>
        </div>
        <div className="row">
          <div className="col-12 col-md-5 m-1">
            <RenderDish dish={props.dish} />
          </div>
          <div className="col-12 col-md-5 m-1">
            <RenderComments comments={props.comments} />
            <CommentForm />
          </div>
        </div>
      </div>
    );
  } else {
    return <div></div>;
  }
};

export default DishDetail;
