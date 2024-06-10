import { InputText } from 'primereact/inputtext';

const Input = (props) => {
	return (
		<>
			<InputText className='w-full p-2 rounded-md focus:outline-none mt-1' {...props} />
		</>
	);
};

export default Input;
