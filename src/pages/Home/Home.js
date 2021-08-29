import React from 'react'
import { useSelector } from 'react-redux'

export default function Home(props) {

  const userLogin = useSelector(state => state.UserJiraReducer.userLogin)

  return (
    <div>
      {/* ? là nếu lấy dc từ api thành công thì nó có giá trị nó sẽ load ra các trường userLogin.name... */}
      {userLogin?.name}
      <img src = {userLogin?.avatar}></img>
    </div>
  )
}
