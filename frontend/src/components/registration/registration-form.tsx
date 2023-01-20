import { Formik, Form, Field } from 'formik';
import { RegisterFormProps } from 'types/user.types';

const RegistrationForm = ({ submitForm, errorMessage }: RegisterFormProps) => {
  const initialFormValue = {
    username: ''
  }

  return (
    <div className=''>
      <Formik
        initialValues={initialFormValue}
        onSubmit={(values => submitForm(values.username))}>
        {({ values }) => (
          <Form>
            <Field
              as="input"
              name="username"
              placeholder="Enter your new username"
              spellcheck={false}
              value={values.username}
            />
            <p>{errorMessage}</p>
            <button type="submit">
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </div>
    
  );
}

export default RegistrationForm;