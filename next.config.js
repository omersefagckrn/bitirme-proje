/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	swcMinify: true,

	webpack: (config, { isServer }) => {
		if (!isServer) {
			config.resolve.fallback = {
				fs: false,
				net: false,
				dns: false,
				tls: false,
				child_process: false
			};
		}

		return config;
	}
};

module.exports = nextConfig;
