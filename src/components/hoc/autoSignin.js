import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router'
import { useDispatch } from 'react-redux'
import { autoSignIn } from '../../store/actions'

const AutoSign = (props) => {
  const [ loading, setLoading ] = useState(true)

  const dispatch = useDispatch()

  useEffect(()=>{
        dispatch(autoSignIn()).then(()=>{
            setLoading(false);
        })
    },[dispatch])


  if(loading){
    return (
      <div className="main_loading" >
        <div className="lds-heart"><div></div></div>
      </div>
    )
  } else {
    return (
      <>
        {props.children}
      </>
    )
  }

}

export default AutoSign

//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MGRiN2ZjYmMxOTk1NTUyZWJiMjFiZmYiLCJlbWFpbCI6ImNAYy5jb20iLCJpYXQiOjE2MjQ5OTkyNTUsImV4cCI6MTYyNTYwNDA1NX0.Z0n8J3r-WTCUXQ0UjDu8qjFx0oVh7r_ag1HuZWR6060