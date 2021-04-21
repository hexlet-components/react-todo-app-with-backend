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
      {({ values, isSubmitting }) => (
        <Form className="form mb-3">
          <div className="input-group">
            <Field
              type="text"
              name="text"
              value={values.text}
              className="form-control"
              placeholder="List name..."
              readOnly={isSubmitting}
              innerRef={inputRef}
            />
            <button
              className="btn btn-outline-success"
              type="submit"
              disabled={isSubmitting || !values.text.trim()}
            >
              <i className="bi bi-check" />
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default NewListForm;
