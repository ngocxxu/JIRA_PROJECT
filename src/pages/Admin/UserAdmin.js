import React, { useState, useEffect, useRef } from "react";
import {
  Table,
  Button,
  Space,
  Popover,
  Avatar,
  Image,
  AutoComplete
} from "antd";
import { UserOutlined } from "@ant-design/icons";
import {
  CheckCircleOutlined,
  DeleteOutlined,
  EditOutlined
} from "@ant-design/icons";
import { Popconfirm, message } from "antd";

//biến đổi nội dung kèm thẻ <p>hello</p> thành nội dung hello và thẻ dc loại bỏ
import { useSelector, useDispatch } from "react-redux";
import { Tag, Divider } from "antd";
import {
  DELETE_USER_ADMIN,
  DELETE_USER_ADMIN_SAGA,
  EDIT_USER_ADMIN_MODAL,
  GET_USER_ADMIN_SAGA,
  GET_USER_SEARCH_ADMIN_SAGA,
  OPEN_FORM_EDIT_USER_ADMIN,
  SEARCH_USER_ADMIN,
} from "../../redux/constants/Jira/UserFormConst";
import FormEditUserAdmin from "../../components/Forms/FormEditUserAdmin/FormEditUserAdmin";

export default function UserAdmin(props) {
  const dispatch = useDispatch();
  const { arrUserAdmin } = useSelector((state) => state.UserAdminReducer);
  const { userSearchAdmin } = useSelector((state) => state.UserAdminReducer);
  const [value, setValue] = useState("");

  //hàm search
  const searchRef = useRef(null);

  const [state, setState] = useState({
    filteredInfo: null,
    sortedInfo: null
  });

  const handleChange = (pagination, filters, sorter) => {
    console.log("Various parameters", pagination, filters, sorter);
    setState({
      filteredInfo: filters,
      sortedInfo: sorter
    });
  };

  const mockVal = (str, repeat = 1) => ({
    value: str.repeat(repeat),
  });

  const [options, setOptions] = useState([]);

  useEffect(() => {
    dispatch({
      type: GET_USER_ADMIN_SAGA
    });
  }, []);

  const columns = [
    {
      title: "ID",
      dataIndex: "userId", //đặt đúng tên thuộc tính, ko dc đặt sai, thì nó mới hiển thị dữ liệu
      key: "userId", //key là thuộc tính
      sorter: (item2, item1) => {
        return item2.userId - item1.userId;
      }
      // sortDirections: ['descend'],
    },
    {
      title: "User Name",
      dataIndex: "name",
      key: "name",
      //sort theo kí tự abc
      sorter: (item2, item1) => {
        let name2 = item2.name?.trim().toLowerCase();
        let name1 = item1.name?.trim().toLowerCase();
        console.log("name2", name2);
        if (name2 < name1) {
          return -1;
        } else {
          return 1;
        }
      }
    },
    {
      title: "Avatar",
      dataIndex: "avatar",
      key: "avatar",
      render: (text, record, index) => {
        // console.log("text", text); //là obj chứa id và name
        // console.log("record", record);
        return (
          <div key={index} className="avatar">
            <img
              src={record.avatar}
              alt={record.avatar}
              style={{ width: 40, height: 40 }}
            />
          </div>
        );
      }
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      render: (text, record, index) => {
        // console.log("text", text); //là obj chứa id và name
        // console.log("record", record);
        return (
          <Tag key={index} color="red">
            {record.email}
          </Tag>
        );
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
      }
    },
    {
      title: "Phone Number",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
      sorter: (item2, item1) => {
        return item2.userId - item1.userId;
      }
    },
    {
      title: "Action",
      dataIndex: "",
      key: "x",
      render: (text, record, index) => {
        return (
          <div key={index}>
            <button
              className="btn btn-primary"
              onClick={() => {
                //dispatch này để mở form
                dispatch({
                  type: OPEN_FORM_EDIT_USER_ADMIN,
                  visible: true,
                  title: "Edit User",
                  Component: <FormEditUserAdmin></FormEditUserAdmin>
                });

                //dispatch dữ liệu của các dòng nội dùng trong bảng ProjectManagement hiện tại lên reducer
                dispatch({
                  type: EDIT_USER_ADMIN_MODAL,
                  userEditModal: record //record chứa obj của values
                });
              }}
            >
              <EditOutlined />
            </button>
            {/* popup thông báo khi bạn xóa */}
            <Popconfirm
              title="Are you sure to delete this user?"
              //khi bạn bấm Yes thì hàm co
              onConfirm={() => {
                dispatch({
                  type: DELETE_USER_ADMIN_SAGA,
                  userId: record.userId
                });
              }}
              okText="Yes"
              cancelText="No"
            >
              <button className="btn btn-danger">
                <DeleteOutlined />
              </button>
            </Popconfirm>
          </div>
        );
      }
    }
  ];

  return (
    <div className="container bg-glass">
      <h3 className="mt-md-3 mt-sm-1" style={{ color: "rgb(25 39 155 / 85%)" }}>
        User Management
      </h3>
      <AutoComplete className="mb-2"
        //thuộc tính option của andt dùng khi ta search 1 chữ nào đó thì xuất hiện bảng popup search như google
        //vì options của antd chỉ nhận vào {label, value} và trong mảng userSearch ta ko chứa 2 thuộc tính đó nên ta phải biến đổi như sau
        options={arrUserAdmin?.map((user, index) => {
          return {
            label: user.name,
            value: user.userId.toString()
          };
        })}
        value={value} //value của antd nhận vào state value dc đặt ở hàm useState phía trên
        //text là giá trị mà ng dùng đang gõ trog trường input
        //do lifecycle, sau khi onSelect kích hoạt setValue thì component dc render lại, làm ta ko thể xóa dc kí tự
        //do đó ta phải dùng onChange để overwrite lại onSelect
        onChange={(valueSelect) => {
          setValue(valueSelect);
        }}
        //onSelect để chọn member dựa vào user.userId
        onSelect={(valueSelect, options) => {
          // console.log(valueSelect); //chứa giá trị user.userId
          // console.log(options); //chứa obj đó là {label:user.name, value:user.userId}

          //set giá trị hộp thoại input =` option.label
          setValue(options.label);

          // gửi lên redux
          dispatch({
            type: SEARCH_USER_ADMIN,
            userSearch: valueSelect,
          })
        }}
        // options={options}  //option gợi ý, lấy từ api về
        style={{ width: 200 }}
        placeholder="Search your username"
        
        //value là giá trị mình nhập vào trường input
        // onSearch mỗi lần search sẽ call api về
        onSearch={(value) => {
          //nếu giá trị value trong trường search mà true, tất là có kí tự search thì ta cleartimeout
          if (searchRef.current) {
            clearTimeout(searchRef.current);
          }
          //khi ta search, thì các kí tự xuất hiện sẽ bị delay khi gọi lên api để tránh api bị overload và tràn ram
          //kiểu như ta dùng settimeout để delay cho hàm GET_USER_API dispatch gọi api bên dưới
          searchRef.current = setTimeout(() => {
            dispatch({
              type: GET_USER_ADMIN_SAGA,
            });
          }, 300);
        }}
      />

      <Table
        className="bg-glass"
        rowKey={"id"}
        columns={columns}
        dataSource={arrUserAdmin} //này là record
        onChange={handleChange}
      />
    </div>
  );
}
