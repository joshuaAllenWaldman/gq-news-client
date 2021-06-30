import React from 'react';
import UserAreaHoc from '../../hoc/userAreaHoc';
import EmailPass from './emailPass';
import Stats from './stats';
const Profile = (props) => {
  return (

    <UserAreaHoc>
      <EmailPass {...props} />
      <hr />
      <Stats {...props} />
    </UserAreaHoc>
  
  )
}

export default Profile

