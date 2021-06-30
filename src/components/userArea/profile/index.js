import React from 'react';
import UserAreaHoc from '../../hoc/userAreaHoc';
import EmailPass from './emailPass';

const Profile = (props) => {
  return (

    <UserAreaHoc>
      <EmailPass {...props} />
      <hr />
      <div className="mt-3">

      </div>
    </UserAreaHoc>
  
  )
}

export default Profile

