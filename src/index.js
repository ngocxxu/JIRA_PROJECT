import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "animate.css"
import App from "./App";
import reportWebVitals from "./reportWebVitals";
//setup redux
import { Provider } from "react-redux";
import store from "./redux/configstore";
import "antd/dist/antd.css";
import { BrowserRouter,Router } from "react-router-dom";
import { history } from "./util/history";
import $ from "jquery";

ReactDOM.render(
  <Router history={history}>
    <Provider store={store}>
      <App />
    </Provider>
  </Router>,
  document.getElementById("root")
);



// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();


$(document).ready(function(){
  $(".button-query").click(function(){
    $(".menu-query .menu-toggle").toggle();
    $(".menu-toggle").css("opacity", "1");
  });
});


//remove icon cancel when page reload
// $(document).ready(function () {
//   $(window).width(function () {
//     if ($(window).width() < 992) {
//       $(".svg-video-popup-remove").css("display", "none");
//     } else{
//       $(".svg-video-popup-remove").css("display", "block");
//     }
//   });
// });

//remove AudioOnly word when resize
$(document).ready(function () {
  $(window).resize(function () {
  if ($(window).width() < 992) {
      $(".button-query").css("opacity", "1");
    }  else{
      $(".button-query").css("opacity", "0");
      $(".menu-toggle").css("opacity", "0");

    }
  });
});

