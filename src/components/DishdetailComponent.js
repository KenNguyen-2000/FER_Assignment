import React, { Component } from "react";
import { Card, CardImg, CardText, CardBody, CardTitle } from "reactstrap";

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
              <li>{`-- ${comment.author}, ${comment.date}`}</li>
            </div>
          );
        })}
      </ul>
    </div>
  );
}

class DishDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    if (this.props.dish) {
      return (
        <>
          <div className="col-12 col-md-5 m-1">
            <RenderDish dish={this.props.dish} />
          </div>
          <div className="col-12 col-md-5 m-1">
            <RenderComments comments={this.props.dish.comments} />
          </div>
        </>
      );
    } else {
      return <div></div>;
    }
  }
}

export default DishDetail;
