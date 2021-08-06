// @ts-check

import React from 'react';
import { useDispatch } from 'react-redux';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import cn from 'classnames';
import { toast } from 'react-toastify';
import { BsCheck } from 'react-icons/bs';

import { setCurrentListId } from '../../store/currentListIdSlice';
import { useAddListMutation, useGetListsQuery } from '../../services/api';

const NewListForm = () => {
  const dispatch = useDispatch();
  const { data: lists, isLoading } = useGetListsQuery();
  const [addList] = useAddListMutation();

  if (isLoading) {
    return null;
  }

  const onSubmit = async ({ text }, { resetForm }) => {
    try {
      const data = await addList({ name: text }).unwrap();
      dispatch(setCurrentListId(data.id));
      resetForm();
    } catch (error) {
      toast('Network error');
    }
  };

  const listsNames = lists.map((i) => i.name);

  const validationSchema = Yup.object().shape({
    text: Yup.string().trim().required().min(3).max(20).notOneOf(listsNames),
  });

  return (
    <Formik
      initialValues={{ text: '' }}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
      validateOnBlur={false}
      validateOnMount={false}
      validateOnChange={false}
    >
      {({ values, isSubmitting, errors, isValid, touched }) => (
        <Form className="form mb-3" data-testid="list-form">
          <label className="visually-hidden" htmlFor="new-list">
            New list
          </label>
          <div className="input-group">
            <Field
              type="text"
              name="text"
              value={values.text}
              className={cn(
                'form-control',
                !!touched.text && (isValid ? 'is-valid' : 'is-invalid')
              )}
              placeholder="List name..."
              readOnly={isSubmitting}
              id="new-list"
            />
            <button
              className="btn btn-outline-success"
              type="submit"
              disabled={isSubmitting}
            >
              <BsCheck />
              <span className="visually-hidden">add list</span>
            </button>
            {errors.text && (
              <div className="invalid-feedback">{errors.text}</div>
            )}
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default NewListForm;
