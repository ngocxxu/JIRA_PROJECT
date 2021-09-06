import React, { useState, useEffect,useRef } from "react";
import {
  Table,
  Button,
  Space,
  Popover,
  Avatar,
  Image,
  AutoComplete,
} from "antd";
import { UserOutlined } from "@ant-design/icons";
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
import { Popconfirm, message } from "antd";

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
import { NavLink } from "react-router-dom";

//hàm thông báo delete
// const confirm = (e) => {
//   console.log(e);
//   message.success("Click on Yes");
// };

// const cancel = (e) => {
//   console.log(e);
//   message.error("Click on No");
// };

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
  const { userSearch } = useSelector((state) => state.UserJiraReducer);
  const [state, setState] = useState({
    filteredInfo: null,
    sortedInfo: null,
  });

  const [value, setValue] = useState("");

  //hàm search 
  const searchRef = useRef(null);
  

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
      render:(text,record, index)=>{
        // console.log('projectList123',projectList);
        return <NavLink to={`/projectdetail/${record.id}`}>{text}</NavLink> //text ở đây chứa project name
      },
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
        // console.log("text", text); //là obj chứa id và name
        // console.log("record", record);
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
      title: "Member",
      dataIndex: "member",
      key: "member",
      render: (text, record, index) => {
        //lặp lấy ra mỗi phần tử trong mảng members
        //dùng slice để chỉ lấy đúng 3 phần tử trog mảng members thôi, dù cho members có nhìu hơn 3 đi chăng nữa
        return (
          <div>
            {record.members?.slice(0, 3).map((member, index) => {
              return (
                <Popover
                key={index}
                  placement="top"
                  title={"Member"}
                  content={() => {
                    return (
                      <table className="table">
                        <thead>
                          <tr>
                            <th>ID</th>
                            <th>Avatar</th>
                            <th>Name</th>
                            <th></th>
                          </tr>
                        </thead>
                        <tbody>
                          {record.members?.map((mem, index) => {
                            return (
                              <tr key={index}>
                                <td>{mem.userId}</td>
                                <td>
                                  <img
                                    src={mem.avatar}
                                    alt={mem.avatar}
                                    width="20"
                                    height="20"
                                  ></img>
                                </td>
                                <td>{mem.name}</td>
                                <td>
                                  <button
                                    onClick={() => {
                                      dispatch({
                                        type: "REMOVE_USER_PROJECT_SAGA",
                                        userProject: {
                                          projectId: record.id,
                                          userId: mem.userId,
                                        },
                                      });
                                    }}
                                    className="btn btn-danger"
                                  >
                                    X
                                  </button>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    );
                  }}
                >
                  <Avatar key={index} src={member.avatar} alt={member.avatar}></Avatar>
                </Popover>
              );
            })}
            {record.members?.length > 3 ? <Avatar>...</Avatar> : ""}
            <Popover
              placement="bottomRight"
              title={"Add user"}
              content={() => {
                return (
                  <AutoComplete
                    //thuộc tính option của andt dùng khi ta search 1 chữ nào đó thì xuất hiện bảng popup search như google
                    //vì options của antd chỉ nhận vào {label, value} và trong mảng userSearch ta ko chứa 2 thuộc tính đó nên ta phải biến đổi như sau
                    options={userSearch?.map((user, index) => {
                      return {
                        label: user.name,
                        value: user.userId.toString(),
                      };
                    })}
                    value={value} //value của antd nhận vào state value dc đặt ở hàm useState phía trên
                    //text là giá trị mà ng dùng đang gõ trog trường input
                    //do lifecycle, sau khi onSelect kích hoạt setValue thì component dc render lại, làm ta ko thể xóa dc kí tự
                    //do đó ta phải dùng onChange để overwrite lại onSelect
                    onChange={(text) => {
                      setValue(text);
                    }}
                    //onSelect để chọn member dựa vào user.userId
                    onSelect={(valueSelect, options) => {
                      // console.log(valueSelect); //chứa giá trị user.userId
                      // console.log(options); //chứa obj đó là {label:user.name, value:user.userId}

                      //set giá trị hộp thoại input =` option.label
                      setValue(options.label);

                      //gọi api gửi về server
                      dispatch({
                        type: "ADD_USER_PROJECT_API",
                        userProject: {
                          projectId: record.id,
                          userId: valueSelect,
                        },
                      });
                    }}
                    // options={options}  //option gợi ý, lấy từ api về
                    style={{ width: 200 }}
                    placeholder="add member"
                    //value là giá trị mình nhập vào trường input
                    //onSearch mỗi lần search sẽ call api về
                    onSearch={(value) => {
                      //nếu giá trị value trong trường search mà true, tất là có kí tự search thì ta cleartimeout
                      if(searchRef.current){
                        clearTimeout(searchRef.current);
                      }
                      //khi ta search, thì các kí tự xuất hiện sẽ bị delay khi gọi lên api để tránh api bị overload và tràn ram
                      //kiểu như ta dùng settimeout để delay cho hàm GET_USER_API dispatch gọi api bên dưới
                      searchRef.current = setTimeout(() => {
                        dispatch({
                          type: "GET_USER_API",
                          keyWord: value,
                        });
                        },300)

                    }}
                  />
                );
              }}
              trigger="click"
            >
              <Button shape="circle">+</Button>
            </Popover>
          </div>
        );
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
                // console.log("text123", text);
                //dispatch này để mở form
                dispatch({
                  type: OPEN_FORM_EDIT_PROJECT,
                  visible: true,
                  title: 'Edit Project',
                  Component: <FormEditProject></FormEditProject>,
                });

                //dispatch dữ liệu của các dòng nội dùng trong bảng ProjectManagement hiện tại lên reducer
                dispatch({
                  type: "EDIT_PROJECT",
                  projectEditModal: record, //record chứa obj của values
                });
              }}
            >
              <EditOutlined />
            </button>
            {/* popup thông báo khi bạn xóa */}
            <Popconfirm
              title="Are you sure to delete this project?"
              //khi bạn bấm Yes thì hàm co
              onConfirm={() => {
                dispatch({
                  type: "DELETE_PROJECT_SAGA",
                  idProject: record.id,
                });
              }}
              okText="Yes"
              cancelText="No"
            >
              <button className="btn btn-danger">
                <DeleteOutlined />
              </button>
            </Popconfirm>
            ,
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
    <div className="container">
      <h3 className="mt-3">Project Management</h3>
      <Space style={{ marginBottom: 16 }}>
        <Button onClick={setAgeSort}>Sort age</Button>
        <Button onClick={clearFilters}>Clear filters</Button>
        <Button onClick={clearAll}>Clear filters and sorters</Button>
      </Space>
      <Table
      className='bg-glass'
        rowKey={"id"}
        columns={columns}
        dataSource={projectList}
        onChange={handleChange}
      />
    </div>
  );
}
