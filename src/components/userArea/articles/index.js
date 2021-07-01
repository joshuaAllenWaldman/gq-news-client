import React, { useReducer, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useFormik } from 'formik';
import * as Yup from 'yup';

import ToastHandler from '../../utils/toasts';
import { Table, Button } from 'react-bootstrap';
import { getUserPosts, updatePostStatus, removePost } from '../../../store/actions';

import UserAreaHoc from '../../hoc/userAreaHoc';

const Articles = (props) => {
  const [sort, setSort] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    { limit: 3, order: 'desc', sortBy: '_id', skip: 0 }
  );

  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const updateStatusHandler = (item) => {
    const status = item.status === 'DRAFT' ? 'PUBLIC' : 'DRAFT';
    dispatch(updatePostStatus(status, item._id, user.posts));
  };


  useEffect(() => {
    dispatch(getUserPosts(sort, [], user.auth._id));
  }, []);

  return (
    <UserAreaHoc>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Title</th>
            <th>Category</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {user.posts
            ? user.posts.map((item, i) => (
                <tr key={i}>
                  <td>{i + 1}</td>
                  <td>{item.title}</td>
                  <td>{item.category.name}</td>
                  <td
                    onClick={() => updateStatusHandler(item)}
                    className={item.status === 'DRAFT' ? 'yell' : 'green'}
                  >
                    {item.status}
                  </td>
                  <td
                        onClick={()=>{
                          dispatch(removePost(item._id,user.posts))
                        }}
                        className="remove_btn"
                      >
                        Remove
                      </td>
                </tr>
              ))
            : null}
        </tbody>
      </Table>

      <Button
        onClick={() => {
          let skip = sort.skip + sort.limit;
          dispatch(
            getUserPosts({ ...sort, skip: skip }, user.posts, user.auth._id)
          ).then(() => {
            setSort({ skip: skip });
          });
        }}
      >
        Load More
      </Button>
      <Button
        className="ml-2"
        variant="outline-info"
        onClick={() => {
          props.history.push('/user_area/create');
        }}
      >
        {' '}
        Create New Article
      </Button>
    </UserAreaHoc>
  );
};

export default Articles;
