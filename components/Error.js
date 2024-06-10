const Error = ({ error }) => {
	return <>{error && <div className='text-red-800 text-xs font-semibold'>{error}</div>}</>;
};

export default Error;
