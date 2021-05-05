// @ts-nocheck

import React, { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Field, Form } from 'formik';
import axios from 'axios';

import { BsCheck } from 'react-icons/bs';

import { listsActions, listsSelectors } from './listsSlice';
import routes from '../../api/routes.js';
import * as Yup from 'yup';
import cn from 'classnames';

const NewListForm = () => {
  const dispatch = useDispatch();


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

  const lists = useSelector(listsSelectors.selectAll);
  const listsNames = useMemo(() => {
    return lists.map((i) => i.name);
  }, [lists]);

  const validationSchema = Yup.object().shape({
    text: Yup.string().required().notOneOf(listsNames),
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
        <Form className="form mb-3">
          <div className="input-group">
            <Field
              type="text"
              name="text"
              value={values.text}
              className={cn('form-control', {
                'is-valid': isValid && touched.text,
                'is-invalid': !isValid && touched.text,
              })}
              placeholder="List name..."
              readOnly={isSubmitting}
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
              disabled={isSubmitting || !values.text.trim()}
            >
              <BsCheck />
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
