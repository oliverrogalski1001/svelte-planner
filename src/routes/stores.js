import { writable, derived } from 'svelte/store';
import classes from '../newSpring2023';

export const subject = writable(undefined);

export const num = writable('');

export const numbers = derived(subject, ($subject) => {
	if ($subject === undefined) {
		return ['---'];
	} else {
		return Object.keys(classes[$subject]);
	}
});
