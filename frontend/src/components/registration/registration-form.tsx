import { Formik, Form, Field } from 'formik';
import { RegisterFormProps } from 'types/user.types';

const RegistrationForm = ({ submitForm, errorMessage }: RegisterFormProps) => {
  const initialFormValue = {
    username: ''
  }

  return (
    <div className='flex flex-col w-96 h-52 justify-center items-center'>
      <div className='flex'>
        <Formik
          initialValues={initialFormValue}
          onSubmit={(values => submitForm(values.username))}>
          {({ values }) => (
            <Form>
              <Field
                as="input"
                className='flex w-full mb-4 h-14 bg-primary-ultralight border-2 border-primary-main px-2 focus:outline-none text-dark-text rounded-md'
                name="username"
                placeholder="Enter your new username"
                spellCheck={false}
                value={values.username}
              />
              <p className='text-xs text-error'>{errorMessage}</p>
              <div className='flex w-full justify-end'>
                <button className='bg-primary-main mt-2 h-10 w-20 text-dark-text justify-self-end rounded-md' type="submit">
                  Register
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
      
    </div>
    
  );
}

export default RegistrationForm;