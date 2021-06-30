import React from 'react'
import { Form, Button, Alert } from 'react-bootstrap'
import { useFormik } from 'formik';
import * as Yup from 'yup'

import ToastHandler from '../../utils/toasts';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserEmailPass } from '../../../store/actions'

const EmailPass = (props) => {
  const user = useSelector(state => state.user)
  const dispatch = useDispatch();
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      email: user.auth.email,
      password: user.auth.password
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid Email'),
      password: Yup.string().min(3, 'Must be more than 5 char')
    }),
    onSubmit: values => {
      onSubmitHandler(values)
    }
  })


  const onSubmitHandler = ({email, password}) => {
    dispatch(updateUserEmailPass(email, password, user.auth._id)).then(({payload})=>{
      if(payload.errors){ 
        ToastHandler(payload.errors, 'ERROR') 
      }else {
        ToastHandler("Update Successful", 'SUCCESS')
      }
    })
  }



  return (
    <div className="mt-3">
      <Form onSubmit={formik.handleSubmit}>
      <Form.Group>
          <Form.Label>Email Address</Form.Label>
          <Form.Control 
            type="text"
            placeholder="Enter your email"
            id="email"
            name="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
          />
          {formik.touched.email && formik.errors.email ? (
            <Alert variant="danger"> 
              {formik.errors.email}
            </Alert>
          ) : null}
        </Form.Group>
        <Form.Group>
          <Form.Label>Password</Form.Label>
          <Form.Control 
            type="password"
            placeholder="Enter Password"
            id="password"
            name="password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
          />
          {formik.touched.password && formik.errors.password ? (
            <Alert variant="danger"> 
              {formik.errors.password}
            </Alert>
          ) : null}
        </Form.Group>
        <Button variant="primary" type="submit" >Update</Button>
      </Form>
    </div>
  )
}

export default EmailPass