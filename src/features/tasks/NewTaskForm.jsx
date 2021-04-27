// @ts-nocheck
/* eslint-disable no-template-curly-in-string */

import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Field, Form } from 'formik';
import axios from 'axios';
import * as Yup from 'yup';
import cn from 'classnames';

import { tasksActions } from './tasksSlice';
import routes from '../../api/routes.js';

Yup.setLocale({
  mixed: {
    required: 'Required!',
  },
  string: {
    min: 'Too Small! Required length > ${min}',
    max: 'Too Long! Required length < ${max}',
  },
});

const minLength = 3;
const maxLength = 30;
const validationSchema = Yup.object().shape({
  text: Yup.string().min(minLength).max(maxLength).required(),
});

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
    <Formik
      initialValues={{ text: '' }}
      validationSchema={validationSchema}
      validateOnBlur={false}
      onSubmit={addTask}
    >
      {({ isSubmitting, isValid, touched, errors }) => (
        <>
          <Form className="form mb-3">
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
                innerRef={inputRef}
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
