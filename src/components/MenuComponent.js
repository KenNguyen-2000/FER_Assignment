import React /* , { Component } */ from "react";
import {
  Card,
  CardImg,
  CardImgOverlay,
  // CardText,
  // CardBody,
  CardTitle,
} from "reactstrap";
import DishDetail from "./DishdetailComponent";

function RenderMenuItem({ dish, onClick }) {
  return (
    <Card onClick={() => onClick(dish)}>
      <CardImg width="100%" src={dish.image} alt={dish.name} />
      <CardImgOverlay>
        <CardTitle>{dish.name}</CardTitle>
      </CardImgOverlay>
    </Card>
  );
}

const Menu = (props) => {
  // renderDish(dish) {
  //   if (dish != null)
  //     return (
  //       <Card key={dish.id} onClick={() => this.props.onClick(dish.id)}>
  //         <CardImg top src={dish.image} alt={dish.name} />
  //         <CardBody>
  //           <CardTitle>{dish.name}</CardTitle>
  //           <CardText>{dish.description}</CardText>
  //         </CardBody>
  //       </Card>
  //     );
  //   else return <div></div>;
  // }

  const menu = props.dishes.map((dish) => {
    return (
      <div className="col-12 col-md-5 m-1" key={dish.id}>
        <RenderMenuItem dish={dish} onClick={props.onClick} />
      </div>
    );
  });
  return (
    <div className="container">
      <div className="row">{menu}</div>
      <div className="row">
        <DishDetail dish={props.selectedDish} />
      </div>
    </div>
  );
};

export default Menu;
