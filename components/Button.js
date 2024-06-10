import { createElement } from 'react';
import { PulseLoader } from 'react-spinners';

const Button = ({ children, color, bgColor, ...props }) => {
	const buttonProps = {
		...props,
		className: `
		 	${color ? `text-${color}` : 'text-white'}
			${bgColor ? `bg-${bgColor}` : 'bg-blue-800'}
            ${props.className || ''}
            flex items-center justify-center p-2 text-center whitespace-nowrap rounded-lg
        `
	};

	return createElement('button', buttonProps, props.disabled ? createElement(PulseLoader, { color: '#FFFFFF', size: 10 }) : children);
};

export default Button;
