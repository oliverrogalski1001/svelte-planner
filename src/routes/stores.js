import { writable, derived } from 'svelte/store';
import classes from "../spring2023.json"

export const subject = writable("")

export const num = writable("")

export const numbers = derived(
	subject,
	$subject => {
		if ($subject === "" || $subject === undefined) {
			return ["---"]
		} else {
			return classes[$subject].map(course => course.number)
		}
	}
)