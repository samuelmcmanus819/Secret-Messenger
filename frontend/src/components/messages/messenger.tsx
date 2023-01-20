import { Field, Form, Formik } from "formik";
import { loadMessages } from "hooks/message-hooks";
import { useDispatch, useSelector } from "react-redux";
import { updateMessages } from "redux/messagesSlice";
import { RootState } from "redux/store";

const Messenger = () => {
  const wallet = useSelector((state: RootState) => state.wallet.signingClient);
  const chattingUser = useSelector((state: RootState) => state.users.chosenUser);
  const dispatch = useDispatch();

  const initialFormValue = {
    message: ''
  }

  const sendMessage = async (message: string) => {
    const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS ?? '';
    const codeHash = process.env.NEXT_PUBLIC_CODE_HASH ?? '';

    const a = await wallet.tx.compute.executeContract({
      sender: wallet.address,
      contract_address: contractAddress,
      code_hash: codeHash,
      msg: { send_message: { recipient: chattingUser.address, message: message } }
    }, { gasLimit: 100_000 });
    
    loadMessages(wallet, chattingUser).then(messages => dispatch(updateMessages(messages)))
  }

  return(
    <div className='flex w-full'>
      <Formik
        initialValues={initialFormValue}
        onSubmit={(values => { sendMessage(values.message); values.message = ''; })}>
        {({ values }) => (
          <Form className="flex w-full">
            <Field
              as="input"
              name="message"
              placeholder="Enter a message..."
              spellcheck={false}
              className='flex w-full mx-2 mb-4 h-8 bg-primary-ultralight px-2 focus:outline-none text-light-text'
              value={values.message}
            />
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default Messenger;