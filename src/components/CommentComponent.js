import React, { useState } from "react";
import { Control, Errors, LocalForm } from "react-redux-form";
import {
  Button,
  Col,
  Label,
  Modal,
  ModalBody,
  ModalHeader,
  Row,
} from "reactstrap";
import { FadeTransform, Fade, Stagger } from "react-animation-components";

const CommentComponent = ({
  comments,
  postComment,
  dishId,
  resetFeedbackForm,
}) => {
  function CommentForm({ dishId, postComment }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [rating, setRating] = useState(0);
    const [author, setAuthor] = useState("");
    const [comment, setComment] = useState("");
    const [message, setMessage] = useState("");
    const [valid, setValid] = useState(false);

    const toggleModal = () => {
      setIsModalOpen(!isModalOpen);
    };

    const handleSubmit = (values) => {
      postComment(dishId, values.rating, values.author, values.comment);
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
            <LocalForm
              model="feedback"
              onSubmit={() => handleSubmit({ author, rating, comment })}
            >
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
                <Label htmlFor="author" md={12}>
                  Your Name
                </Label>
                <Col md={12}>
                  <Control.text
                    model=".author"
                    id="author"
                    name="author"
                    placeholder="Your Name"
                    className="form-control"
                    onChange={(e) => setAuthor(e.target.value)}
                    validators={{
                      validate,
                    }}
                  />
                </Col>
                <Col md={12}>
                  <Errors
                    style={{ color: "red" }}
                    model=".author"
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

  return (
    <div>
      <h4>Comments</h4>
      <ul className="list-unstyled">
        <Stagger in>
          {comments.map((comment) => {
            return (
              <Fade in>
                <li key={comment.id}>
                  <p>{comment.comment}</p>
                  <p>
                    -- {comment.author} ,{" "}
                    {new Intl.DateTimeFormat("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "2-digit",
                    }).format(new Date(Date.parse(comment.date)))}
                  </p>
                </li>
              </Fade>
            );
          })}
        </Stagger>
      </ul>
      <CommentForm dishId={dishId} postComment={postComment} />
    </div>
  );
};

export default CommentComponent;
