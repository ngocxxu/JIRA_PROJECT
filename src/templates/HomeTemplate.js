import React,{Fragment} from 'react';
import {Route} from 'react-router-dom';
import Header from '../components/Home/Header/Header';


export const HomeTemplate = (props) => {

  return <Route exact path={props.path} render={(propsRoute)=>{
    return <Fragment>
        <Header />
        <props.component {...propsRoute} />
    </Fragment>
 }} />
}
