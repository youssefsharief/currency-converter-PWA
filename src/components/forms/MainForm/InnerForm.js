import React from 'react'
import DefaultInput from '../../ui-inputs/DefaultInputLayout';
import PropTypes from 'prop-types';
import SubmitButton from '../../buttons/SubmitButton';
import { Form, Field } from 'formik';
import { InputFeedback } from '../../text/InputFeedback';

export const InnerForm = ({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting, dirty }) => (
    <Form className="form-inline">
        <DefaultInput label="Amount">
            <Field type="number" name="amount" className="form-control" placeholder="Enter numeric Amount" />
        </DefaultInput>
        <InputFeedback error={touched.amount && errors.amount} />
        <DefaultInput label="Convert From">
            <Field component="select" name="startCurrency" className="form-control">
            <option value="" disabled>Select currency</option>
                {
                    values.currencies.map((currency, i) => <option key={currency.id} value={currency.id}>{currency.currencyName}</option>)
                }
            </Field>
        </DefaultInput>
        <p> to </p>
        <DefaultInput label="Convert To">
            <Field component="select" name="endCurrency" className="form-control">
            <option value="" disabled>Select currency</option>
                {
                    values.currencies.map((currency, i) => <option key={currency.id} value={currency.id}>{currency.currencyName}</option>)
                }
            </Field>
        </DefaultInput>
        <SubmitButton disabled={!dirty || isSubmitting || Object.keys(errors).length} ></SubmitButton>
    </Form>
)

InnerForm.propTypes = {
    handleBlur: PropTypes.func.isRequired,
    handleChange: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    isSubmitting: PropTypes.bool.isRequired,
    values: PropTypes.any.isRequired,
    errors: PropTypes.any.isRequired,
    touched: PropTypes.any.isRequired,
    dirty: PropTypes.bool
}

