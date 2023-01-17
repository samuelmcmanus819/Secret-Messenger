import { Formik, Form, Field } from 'formik';
import { useState } from 'react';
import { RegisterFormProps } from 'types/user.types';

const RegistrationForm = ({ submitForm }: RegisterFormProps) => {
  const [username, setUsername] = useState('');
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