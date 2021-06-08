// @ts-check
/* eslint-disable no-template-curly-in-string */

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Field, Form } from 'formik';
import axios from 'axios';
import * as Yup from 'yup';
import cn from 'classnames';
import { toast } from 'react-toastify';

import { tasksActions, tasksSelectors } from './tasksSlice';
import routes from '../../api/routes.js';
import { selectCurrentListId } from '../../store/currentListIdSlice';

const NewTaskForm = () => {
  const dispatch = useDispatch();
  const currentListId = useSelector(selectCurrentListId);

  const tasks = useSelector(tasksSelectors.selectByCurrentListId);
  const tasksNames = tasks.map((i) => i.text);

  const validationSchema = Yup.object().shape({
    text: Yup.string().required().notOneOf(tasksNames),
  });

  const addTask = async ({ text }, { resetForm }) => {
    try {
      const url = routes.listTasks(currentListId);
      const response = await axios.post(url, { text });
      dispatch(tasksActions.add(response.data));
      resetForm();
    } catch (error) {
      toast('Network error');
    }
  };

  return (
    <Formik
      initialValues={{ text: '' }}
      validationSchema={validationSchema}
      onSubmit={addTask}
      validateOnBlur={false}
      validateOnMount={false}
      validateOnChange={false}
    >
      {({ isSubmitting, isValid, touched, errors }) => (
        <>
          <Form className="form mb-3" id="task-form">
            <label className="visually-hidden" htmlFor="new-task">
              New task
            </label>
            <div className="input-group">
              <Field
                type="text"
                className={cn('form-control', {
                  'is-valid': isValid && touched.text,
                  'is-invalid': !isValid && touched.text,
                })}
                placeholder="Please type text..."
                name="text"
                readOnly={isSubmitting}
                id="new-task"
              />
              <button
                className="btn btn-outline-success"
                type="submit"
                disabled={isSubmitting}
              >
                Add
              </button>
              {errors.text && (
                <div className="invalid-feedback">{errors.text}</div>
              )}
            </div>
          </Form>
        </>
      )}
    </Formik>
  );
};

export default NewTaskForm;
