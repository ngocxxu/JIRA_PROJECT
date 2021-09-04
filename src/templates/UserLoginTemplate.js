import React, { Fragment, useState, useEffect } from "react";
import { Route } from "react-router-dom";
import { Button, Layout } from "antd";
const { Header, Footer, Sider, Content } = Layout;

export const UserLoginTemplate = (props) => {

  //dùng hàm Math.round để làm tròn
  // width: Math.round(window.innerWidth)

  // const [state, setstate] = useState({
  //   width: window.innerWidth,
  //   height: window.innerHeight,
  // })

  // useEffect(() => {
  //   //mỗi lần ng dùng resize thì nó sẽ chạy vô hàm này tính toán
  //   //onresize nó sẽ tính lại kích thước màn hình khi ng dùng thao tác
  //   window.onresize = () => {
  //     setSize({
  //       width: window.innerWidth,
  //       height: window.innerHeight,
  //     })
  //   }
  // },[])


  //chức năng của propsRoute dùng trong history, put hoặc chuyển trang
  return (
    <Route
      exact
      path={props.path}
      render={(propsRoute) => {
        return (
          <Fragment>
            <div className="d-flex">
              <div className="w-50">
                <img
                  className="w-100 vh-100"
                  src="https://picsum.photos/2000/2000"
                  alt="abc"
                />
              </div>
              <div className="w-50">
                <props.component {...propsRoute}></props.component>
              </div>
            </div>
          </Fragment>
        )
      }}
    ></Route>
  )
}
