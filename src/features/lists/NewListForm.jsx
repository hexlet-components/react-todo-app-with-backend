// @ts-check

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Field, Form } from 'formik';
import axios from 'axios';
import * as Yup from 'yup';
import cn from 'classnames';
import { toast } from 'react-toastify';
import { BsCheck } from 'react-icons/bs';

import { listsActions, listsSelectors } from './listsSlice';
import { setCurrentListId } from '../../store/currentListIdSlice';
import routes from '../../api/routes.js';

const NewListForm = () => {
  const dispatch = useDispatch();

  const addList = async ({ text }, { resetForm }) => {
    try {
      const url = routes.lists();
      const { data } = await axios.post(url, { name: text });
      dispatch(listsActions.add(data));
      dispatch(setCurrentListId(data.id));
      resetForm();
    } catch (error) {
      toast('Network error');
    }
  };

  const lists = useSelector(listsSelectors.selectAll);
  const listsNames = lists.map((i) => i.name);

  const validationSchema = Yup.object().shape({
    text: Yup.string().trim().required().min(3).max(20).notOneOf(listsNames),
  });

  return (
    <Formik
      initialValues={{ text: '' }}
      onSubmit={addList}
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
