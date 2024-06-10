const Label = ({ label }) => {
	return (
		<label className='flex items-start space-x-[1px] pt-4'>
			<div className='text-black text-xs font-medium'>{label}</div>
			<div className='text-redsoft text-xs font-medium'>*</div>
		</label>
	);
};

export default Label;
