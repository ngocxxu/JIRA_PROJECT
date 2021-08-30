import React, { useState } from "react";
import {
  Drawer,
  Form,
  Button,
  Col,
  Row,
  Input,
  Select,
  DatePicker,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import { CLOSE_DRAWER, OPEN_DRAWER } from "../../redux/constants/Jira/DrawerConst";


export default function ModalJira(props) {

  const {visible,ComponentContentDrawer,callBackSubmit} = useSelector(state => state.DrawerJiraReducer);

  const dispatch = useDispatch();

  const showDrawer = () => {
    dispatch({
      type: OPEN_DRAWER,
      visible: true,
    });
  };

  const onClose = () => {
    dispatch({
      type: CLOSE_DRAWER,
      visible: false,
    });
  };

  return (
    <>
      <Drawer
        title="Create a new account"
        width={720}
        onClose={onClose}
        visible={visible}
        bodyStyle={{ paddingBottom: 80 }}
        footer={
          <div
            style={{
              textAlign: "right",
            }}
          >
            <Button onClick={onClose} style={{ marginRight: 8 }}>
              Cancel
            </Button>
            <Button onClick={callBackSubmit} type="primary">
              Submit
            </Button>
          </div>
        }
      >
        {/* Nội dung thay đổi của drawer */}
        {ComponentContentDrawer}
      </Drawer>
    </>
  );
}
