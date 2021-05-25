// @ts-check

import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Field, Form } from 'formik';
import axios from 'axios';

import { tasksActions } from './tasksSlice';
import routes from '../../api/routes.js';

const NewTaskForm = () => {
  const dispatch = useDispatch();
  const currentListId = useSelector((state) => state.currentListId);
  const inputRef = useRef();

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const addTask = async ({ text }, { resetForm }) => {
    try {
      const url = routes.listTasks(currentListId);
      const response = await axios.post(url, { text });
      dispatch(tasksActions.add(response.data));
      resetForm();
    } catch (error) {
      console.log(error);
    }
    inputRef.current?.focus();
  };

  return (
    <Formik initialValues={{ text: '' }} onSubmit={addTask}>
      {({ isSubmitting }) => (
        <Form className="form mb-3">
          <label className="visually-hidden" htmlFor="new-task">
            New task
          </label>
          <div className="input-group">
            <Field
              type="text"
              className="form-control"
              placeholder="Please type text..."
              name="text"
              readOnly={isSubmitting}
              innerRef={inputRef}
              required
              id="new-task"
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

export default NewTaskForm;
