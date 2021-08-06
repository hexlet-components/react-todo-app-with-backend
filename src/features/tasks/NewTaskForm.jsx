// @ts-check

import React from 'react';
import { useSelector } from 'react-redux';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import cn from 'classnames';
import { toast } from 'react-toastify';

import { selectCurrentListId } from '../../store/currentListIdSlice';
import {
  useAddTaskMutation,
  useGetTasksByListIdQuery,
} from '../../services/api';

const NewTaskForm = () => {
  const currentListId = useSelector(selectCurrentListId);

  const { data: tasks, isLoading } = useGetTasksByListIdQuery(currentListId);
  const [addTask] = useAddTaskMutation();

  if (isLoading) {
    return null;
  }

  const tasksNames = tasks.map((i) => i.text);

  const validationSchema = Yup.object().shape({
    text: Yup.string().trim().required().min(3).max(20).notOneOf(tasksNames),
  });

  const onSubmit = async ({ text }, { resetForm }) => {
    try {
      await addTask({ listId: currentListId, text });
      resetForm();
    } catch (error) {
      toast('Network error');
    }
  };

  return (
    <Formik
      initialValues={{ text: '' }}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
      validateOnBlur={false}
      validateOnMount={false}
      validateOnChange={false}
    >
      {({ isSubmitting, isValid, touched, errors }) => (
        <>
          <Form className="form mb-3" data-testid="task-form">
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
