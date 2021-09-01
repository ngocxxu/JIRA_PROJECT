import React, { useState, useEffect } from "react";
import { Layout, Menu } from "antd";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
  UnorderedListOutlined,
  PlusOutlined,
  SearchOutlined
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import FormCreateTask from '../Forms/FormCreateTask/FormCreateTask'

const { Header, Sider, Content } = Layout;

export default function SidebarJira() {

  const dispatch = useDispatch();

  // const state = useSelector(state => state.state);

  const [state, setState] = useState({
    collapsed: false,
  });

  const toggle = () => {
    setState({
      collapsed: !state.collapsed,
    });
  };

  return (
    <div>
      <Sider trigger={null} collapsible collapsed={state.collapsed} style={{height: '100%',fontSize: '2rem'}}>
      <div className="text-center" onClick={()=>{toggle()}}><UnorderedListOutlined style={{color: 'white',cursor: "pointer" }} /></div>
        <div className="logo" />
        <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
          <Menu.Item key="1" icon={<PlusOutlined />} onClick={()=>{
            dispatch({
              type: 'OPEN_FORM_CREATE_TASK',
              visible: true,
              Component: <FormCreateTask></FormCreateTask>,
            })
          }} >
            Create Tasks
          </Menu.Item>
          <Menu.Item key="2" icon={<SearchOutlined />}>
            Search
          </Menu.Item>
        </Menu>
      </Sider>
    </div>
  );
}
