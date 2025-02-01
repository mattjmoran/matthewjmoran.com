const config = {
	'**/*.{js,ts,svelte}': ['pnpm run format', 'pnpm run lint'],
	'**/*.{json,yaml,html,css,md}': ['pnpm run format']
};

export default config;
