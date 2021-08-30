import React, { useState, useEffect } from "react";
import { Table, Button, Space } from "antd";
import {
  CheckCircleOutlined,
  DeleteOutlined,
  EditOutlined,
} from "@ant-design/icons";
import {
  CREATE_PROJECT_SAGA,
  GET_LIST_PROJECT,
  GET_LIST_PROJECT_SAGA,
} from "../../../redux/constants/Jira/JiraConst";

//biến đổi nội dung kèm thẻ <p>hello</p> thành nội dung hello và thẻ dc loại bỏ
import ReactHtmlParser from "react-html-parser";
import { useSelector, useDispatch } from "react-redux";
import { Tag, Divider } from "antd";
import {
  CLOSE_DRAWER,
  OPEN_DRAWER,
  OPEN_FORM_EDIT_PROJECT,
} from "../../../redux/constants/Jira/DrawerConst";
import FormEditProject from "../../../components/Forms/FormEditProject/FormEditProject";

const data = [
  {
    id: 1029,
    projectName: "bono",
    description: "<p>bono</p>",
    categoryId: 1,
    categoryName: "Dự án web",
    alias: "bono",
    deleted: false,
  },
  {
    id: 1029,
    projectName: "bono2",
    description: "<p>bono</p>",
    categoryId: 1,
    categoryName: "Dự án web",
    alias: "bono",
    deleted: false,
  },
];

export default function ProjectManagement(props) {
  const dispatch = useDispatch();

  const [state, setState] = useState({
    filteredInfo: null,
    sortedInfo: null,
  });

  const projectList = useSelector(
    (state) => state.ProjectJiraReducer.projectList
  );

  useEffect(() => {
    dispatch({
      type: GET_LIST_PROJECT_SAGA,
    });
  }, []);

  const handleChange = (pagination, filters, sorter) => {
    console.log("Various parameters", pagination, filters, sorter);
    setState({
      filteredInfo: filters,
      sortedInfo: sorter,
    });
  };

  const clearAll = () => {
    setState({
      filteredInfo: null,
      sortedInfo: null,
    });
  };

  const setAgeSort = () => {
    setState({
      sortedInfo: {
        order: "descend",
        columnKey: "age",
      },
    });
  };

  const clearFilters = () => {
    setState({ filteredInfo: null });
  };

  let { sortedInfo, filteredInfo } = state;
  sortedInfo = sortedInfo || {};
  filteredInfo = filteredInfo || {};

  const columns = [
    {
      title: "ID",
      dataIndex: "id", //đặt đúng tên thuộc tính, ko dc đặt sai, thì nó mới hiển thị dữ liệu
      key: "id", //key là thuộc tính
      sorter: (item2, item1) => {
        return item2.id - item1.id;
      },
      // sortDirections: ['descend'],
    },
    {
      title: "Project Name",
      dataIndex: "projectName",
      key: "projectName",
      //sort theo kí tự abc
      sorter: (item2, item1) => {
        let projectName2 = item2.projectName?.trim().toLowerCase();
        let projectName1 = item1.projectName?.trim().toLowerCase();
        console.log("projectName2", projectName2);
        if (projectName2 < projectName1) {
          return -1;
        } else {
          return 1;
        }
      },
    },
    // {
    //   title: "Description",
    //   dataIndex: "description",
    //   key: "description",
    //   render: (text, record, index) => {
    //     console.log('text', text);
    //     console.log('record', record);
    //     console.log('index', index);
    //     let jsxContent = ReactHtmlParser(text);
    //     return <div key={index}>
    //       {jsxContent}
    //     </div>
    //   }
    // },
    {
      title: "Category Name",
      dataIndex: "categoryName",
      key: "categoryName",
      sorter: (item2, item1) => {
        let categoryName2 = item2.categoryName?.trim().toLowerCase();
        let categoryName1 = item1.categoryName?.trim().toLowerCase();
        console.log("categoryName2", categoryName2);
        if (categoryName2 < categoryName1) {
          return -1;
        } else {
          return 1;
        }
      },
    },
    {
      title: "Creator",
      dataIndex: "creator",
      key: "creator",
      render: (text, record, index) => {
        console.log("text", text);
        console.log("record", record);
        return <Tag color="green">{record.creator?.name}</Tag>;
      },
      sorter: (item2, item1) => {
        let creator2 = item2.creator?.name.trim().toLowerCase();
        let creator1 = item1.creator?.name.trim().toLowerCase();
        console.log("creator2", creator2);
        if (creator2 < creator1) {
          return -1;
        } else {
          return 1;
        }
      },
    },

    {
      title: "Action",
      dataIndex: "",
      key: "x",
      render: (text, record, index) => {
        return (
          <div>
            <button
              className="btn btn-primary"
              type
              onClick={() => {
                console.log("record",record);
                //dispatch này để mở form
                dispatch({
                  type: OPEN_FORM_EDIT_PROJECT,
                  visible: true,
                  Component: <FormEditProject></FormEditProject>,
                });

                //dispatch dữ liệu của các dòng nội dùng trong bảng ProjectManagement hiện tại lên reducer
                dispatch({
                  type: 'EDIT_PROJECT',
                  projectEditModal: record, //record chứa obj của values
                })
              }}
            >
              <EditOutlined />
            </button>
            <button className="btn btn-danger">
              <DeleteOutlined />
            </button>
          </div>
        );
      },
    },
    // {
    //   title: "alias",
    //   dataIndex: "alias",
    //   key: "alias",
    // },
    // {
    //   title: "deleted",
    //   dataIndex: "deleted",
    //   key: "deleted",
    // },
  ];

  return (
    <div className="container-fluid">
      <h3 className="mt-3">Project Management</h3>
      <Space style={{ marginBottom: 16 }}>
        <Button onClick={setAgeSort}>Sort age</Button>
        <Button onClick={clearFilters}>Clear filters</Button>
        <Button onClick={clearAll}>Clear filters and sorters</Button>
      </Space>
      <Table
        rowKey={"id"}
        columns={columns}
        dataSource={projectList}
        onChange={handleChange}
      />
    </div>
  );
}
