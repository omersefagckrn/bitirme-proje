import axios from 'axios';

const confirmEndpoint = (endpoint) => {
	const apiUrl = process.env.NEXT_PUBLIC_API_URL;
	return `${apiUrl}${endpoint}`;
};

const headerBuilder = (headers) => {
	const defaultHeaders = {
		'Content-Type': 'application/json'
	};

	return { ...defaultHeaders, ...(headers ?? {}) };
};

export const apiHelper = {
	get: async (endpoint, headers) => {
		const response = await axios.get(confirmEndpoint(endpoint), {
			headers: headerBuilder(headers)
		});

		return response.data;
	},
	post: async (endpoint, data, headers) => {
		const response = await axios.post(confirmEndpoint(endpoint), data, {
			headers: headerBuilder(headers)
		});

		return response.data;
	},
	put: async (endpoint, data, headers) => {
		const response = await axios.put(confirmEndpoint(endpoint), data, {
			headers: headerBuilder(headers)
		});

		return response.data;
	},
	delete: async (endpoint, headers) => {
		const response = await axios.delete(confirmEndpoint(endpoint), {
			headers: headerBuilder(headers)
		});

		return response.data;
	},
	patch: async (endpoint, data, headers) => {
		const response = await axios.patch(confirmEndpoint(endpoint), data, {
			headers: headerBuilder(headers)
		});

		return response.data;
	}
};
