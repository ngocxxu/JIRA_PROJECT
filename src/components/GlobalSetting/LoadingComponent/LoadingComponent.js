import React from 'react'
import { useSelector } from 'react-redux'
import LoadingReducer from '../../../redux/reducers/LoadingReducer'
import styleLoading from './LoadingComponent.module.css'
import loading from '../../../assets/imgLoading/load.gif'


export default function LoadingComponent(props) {
  
  const {isLoading} = useSelector(state => state.LoadingReducer)

  if(isLoading) {
    return (

      <div className={styleLoading.bgLoading}>
        <img src={loading}></img>
      </div>
    )
    }else{
      return ''
    }
}
