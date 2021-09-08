/* eslint-disable jsx-a11y/img-redundant-alt */
import React from "react";
import demo1 from "../../../assets/img/demo1.png";
import demo2 from "../../../assets/img/demo2.png";
import demo3 from "../../../assets/img/demo3.jpg";
import demo4 from "../../../assets/img/demo4.png";
import demo5 from "../../../assets/img/demo5.png";
import demo6 from "../../../assets/img/demo6.png";

export default function Minidesign(props) {
  return (
    <div className="container d-md-flex flex-wrap justify-content-center align-items-center animate__animated animate__fadeInUp">
      <div className="miniproject_right  m-md-4">
        <div className="card bg-glass">
          <img className="card-img-top" src={demo4} alt="Card image cap" />
          <div className="card-body">
            <h5 className="card-title">Carousel 1</h5>
            <p className="card-text">
              A small project which is taken from my handmade product.
            </p>
            <div>
              <a
                href="https://drive.google.com/drive/folders/1Yfup9A77cBjFntYUZrC9RcLzVASHbasZ?usp=sharing"
                className="btn btn-card"
              >
                Demo
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="miniproject_right  m-md-4">
        <div className="card bg-glass">
          <img className="card-img-top" src={demo5} alt="Card image cap" />
          <div className="card-body">
            <h5 className="card-title">Carousel 2</h5>
            <p className="card-text">
              A small project which is taken from my handmade product.
            </p>
            <div>
              <a
                href="https://drive.google.com/drive/folders/1Yfup9A77cBjFntYUZrC9RcLzVASHbasZ?usp=sharing"
                className="btn btn-card"
              >
                Demo
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="miniproject_right  m-md-4">
        <div className="card bg-glass">
          <img
            className="card-img-top mw-100"
            src={demo6}
            alt="Card image cap"
          />
          <div className="card-body">
            <h5 className="card-title">Themes</h5>
            <p className="card-text">
              A small project which is taken from my handmade product.
            </p>
            <div>
              <a
                href="https://www.figma.com/file/Gc6fEczJDy8ZoOw0z53zEE/Zupi-Paracord?node-id=0%3A1"
                className="btn btn-card"
              >
                Demo
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="miniproject_right  m-md-4">
        <div className="card bg-glass">
          <img className="card-img-top" src={demo1} alt="Card image cap" />
          <div className="card-body">
            <h5 className="card-title">Carousel 3</h5>
            <p className="card-text">
              A small project which is taken from my handmade product.
            </p>
            <div>
              <a
                href="https://drive.google.com/drive/folders/1Yfup9A77cBjFntYUZrC9RcLzVASHbasZ?usp=sharing"
                className="btn btn-card"
              >
                Demo
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="miniproject_right  m-md-4">
        <div className="card bg-glass">
          <img className="card-img-top" src={demo2} alt="Card image cap" />
          <div className="card-body">
            <h5 className="card-title">Carousel 4</h5>
            <p className="card-text">
              A small project which is taken from my handmade product.
            </p>
            <div>
              <a
                href="https://drive.google.com/drive/folders/1Yfup9A77cBjFntYUZrC9RcLzVASHbasZ?usp=sharing"
                className="btn btn-card"
              >
                Demo
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="miniproject_right  m-md-4">
        <div className="card bg-glass">
          <img
            className="card-img-top mw-100"
            src={demo3}
            alt="Card image cap"
          />
          <div className="card-body">
            <h5 className="card-title">Logo</h5>
            <p className="card-text">
              A small project which is taken from my handmade product.
            </p>
            <div>
              <a
                href="https://drive.google.com/drive/folders/1Yfup9A77cBjFntYUZrC9RcLzVASHbasZ?usp=sharing"
                className="btn btn-card"
              >
                Demo
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
