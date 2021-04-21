// @ts-nocheck

import React, { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { Formik, Field, Form } from 'formik';
import axios from 'axios';

import { listsActions } from './listsSlice';
import routes from '../../api/routes.js';

const NewListForm = () => {
  const dispatch = useDispatch();
  const inputRef = useRef();

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const addList = async ({ text }, { resetForm }) => {
    try {
      const url = routes.lists();
      console.log({ url, text });
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
          <div className="input-group">
            <Field
              type="text"
              className="form-control"
              placeholder="Please type text..."
              name="text"
              readOnly={isSubmitting}
              innerRef={inputRef}
            />
            <button
              className="btn btn-outline-success"
              type="submit"
              disabled={isSubmitting}
            >
              Add
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default NewListForm;
