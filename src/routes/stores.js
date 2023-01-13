import { writable, derived } from 'svelte/store';
import classes from "../spring2023.json"

export const subject = writable("STAT")
export const num = writable("100")
export const numbers = derived(
	subject,
	$subject => classes[$subject].map(course => course.number)
)