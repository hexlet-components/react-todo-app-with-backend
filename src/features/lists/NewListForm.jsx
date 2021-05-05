// @ts-check

import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { Formik, Field, Form } from 'formik';
import axios from 'axios';
import { BsCheck } from 'react-icons/bs';

import { listsActions } from './listsSlice.js';
import routes from '../../api/routes.js';

const NewListForm = () => {
  const dispatch = useDispatch();
  const inputRef = useRef();

  const addList = async ({ text }, { resetForm }) => {
    try {
      const url = routes.lists();
      const response = await axios.post(url, { name: text });
      dispatch(listsActions.add(response.data));
      resetForm();
    } catch (error) {
      console.log(error);
    }
    inputRef.current?.focus();
  };

  return (
    <Formik initialValues={{ text: '' }} onSubmit={addList}>
      {({ isSubmitting }) => (
        <Form className="form mb-3">
          <label className="visually-hidden" htmlFor="new-list">New list</label>
          <div className="input-group">
            <Field
              type="text"
              name="text"
              className="form-control"
              placeholder="List name..."
              readOnly={isSubmitting}
              innerRef={inputRef}
              required
              id="new-list"
            />
            <button
              className="btn btn-outline-success"
              type="submit"
              disabled={isSubmitting}
            >
              <BsCheck />
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default NewListForm;
