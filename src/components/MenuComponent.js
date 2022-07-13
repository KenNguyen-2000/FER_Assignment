import React /* , { Component } */ from "react";
import {
  Card,
  CardImg,
  CardImgOverlay,
  CardTitle,
  Breadcrumb,
  BreadcrumbItem,
} from "reactstrap";
import { Link } from "react-router-dom";
import { Loading } from "./LoadingComponent";
import { baseUrl } from "../shared/baseUrl";

function RenderCard({ item, isLoading, errMess }) {
  if (isLoading) {
    return <Loading />;
  } else if (errMess) {
    return <h4>{errMess}</h4>;
  } else
    return (
      <Card>
        <Link to={`/menu/${item.id}`}>
          <CardImg width="100%" src={baseUrl + item.image} alt={item.name} />
          <CardImgOverlay>
            <CardTitle>{item.name}</CardTitle>
          </CardImgOverlay>
        </Link>
      </Card>
    );
}

const Menu = (props) => {
  console.log(props);
  const menu = props.dishes.dishes.map((dish) => {
    return (
      <div className="col-12 col-md-5 m-1" key={dish.id}>
        <RenderCard
          item={dish}
          isLoading={dish.isLoading}
          errMess={props.dishesErrMess}
        />
      </div>
    );
  });
  return (
    <div className="container">
      <div className="row">
        <Breadcrumb>
          <BreadcrumbItem>
            <Link to="/home">Home</Link>
          </BreadcrumbItem>
          <BreadcrumbItem active>Menu</BreadcrumbItem>
        </Breadcrumb>
        <div className="col-12">
          <h3>Menu</h3>
          <hr />
        </div>
      </div>
      {props.dishesLoading ? <Loading /> : <div className="row">{menu}</div>}
    </div>
  );
};

export default Menu;
