/**
 * Implements the component interface to login and view Plaid data.
 * @namespace FICOComponent
 * @category ReactComponents
 */

import * as React from "react";
import Button from 'react-bootstrap/Button';
import { Formik } from 'formik';
import { AppContext, AppContextState } from "./../../context/app";
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const initialFicoValues = { firstName: '', middleName: '', lastName: '', suffix: '',  DOB: '', SSN: ''};

const ficoFormValidation = (values: any) => {
    const errors = {};
    return errors;
};

interface FICOConnectorProps {
  done: Function;
}

function requestFico(values: any) {
  return Promise.resolve({ 'score': 800 });
}

const updateNewFicoScore = (updateAppState: Function)  => (ficoResponse: any) => updateAppState((st: AppContextState) => {
  const fico = {
    score: ficoResponse.score,
  };
  return { ...st, fico };
});

/**
 * Returns a compnent used to generate UI for the Plaid interface.
 * @function FICOConnector
 * @memberof FICOComponent
 */
export const FICOConnector = (props: FICOConnectorProps) => {
  const { state, updateAppState } = React.useContext(AppContext);
  const { done } = props;
  return (
    <div className="fico-connector">
      <Formik
        initialValues={initialFicoValues}
        validate={ficoFormValidation}
        onSubmit={(values, { setSubmitting }) => {
          requestFico(values)
            .then(updateNewFicoScore(updateAppState))
            .finally(() => {
              setSubmitting(false);
              done();
            });
        }}
        >
        {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
            /* and other goodies */
        }) => (
          <Form noValidate onSubmit={handleSubmit}>
            <Form.Group as={Row}>
              <Form.Label column sm={2}>First</Form.Label>
              <Col>
                <Form.Control
                  type="text"
                  name="firstName"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.firstName}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm={2}>Middle</Form.Label>
              <Col>
                <Form.Control
                  type="text"
                  name="middleName"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.middleName}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm={2}>Last</Form.Label>
              <Col>
                <Form.Control
                  type="text"
                  name="lastName"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.lastName}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm={2}>Suffix</Form.Label>
              <Col>
                <Form.Control
                  type="text"
                  name="suffix"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.suffix}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm={2}>DOB</Form.Label>
              <Col>
                <Form.Control
                  type="text"
                  name="DOB"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.DOB}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm={2}>SSN</Form.Label>
              <Col>
                <Form.Control
                  type="text"
                  name="SSN"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.SSN}
                />
              </Col>
            </Form.Group>
            <Button type="submit" disabled={isSubmitting} block>
              Submit
            </Button>
          </Form>
        )}
        </Formik>
    </div>
  );
};
