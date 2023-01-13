import { sveltekit } from '@sveltejs/kit/vite';
import { ssp } from 'sveltekit-search-params/plugin'

const config = {
	plugins: [ssp(), sveltekit()]
};

export default config;
