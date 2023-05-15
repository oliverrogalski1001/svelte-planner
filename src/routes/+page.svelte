<script>
	import '../app.css'
	import 'carbon-components-svelte/css/all.css'
	import Semester from './Semester.svelte'
	import classes from '../newSpring2023'
	import { Button, Modal } from 'carbon-components-svelte'
	import { queryParam } from 'sveltekit-search-params'
	//import { inject } from '@vercel/analytics'
	import Intro from './Intro.svelte'
	import { onMount } from 'svelte'
	import { isEqual } from 'lodash-es'
	// import * as _ from 'lodash-es'

	//inject()

	let semesters = Array.from(Array(8).keys()).map((i) => i + 1)

	const schedule = queryParam('schedule', {
		encode: (value) => value.reduce((string, c) => (string += c.semID + c.subject + '~' + c.code + '-'), ''),
		decode: (value) => {
			if (value === null) {
				return []
			}
			value = value.split('-')
			value.pop()
			value = value.map((code) => {
				const tempSub = code.slice(1, code.indexOf('~'))
				const tempCode = code.slice(code.indexOf('~') + 1)
				const tempSemID = parseInt(code.slice(0, 1))
				return {
					semID: tempSemID,
					subject: tempSub,
					code: tempCode,
					id: tempSemID + tempSub + tempCode
				}
			})
			return value
		},
		defaultValue: [
			{
				semID: 1,
				subject: 'STAT',
				code: '400',
				id: '1STAT400'
			}
		]
	})

	let sub
	schedule.subscribe((value) => {
		sub = value
	})

	// get user data
	export let data
	$: ({ supabase, session, params } = data)
	async function signInWithGoogle() {
		const { loginData, error } = await data.supabase.auth.signInWithOAuth({
			provider: 'google'
		})
		console.log(loginData)
	}

	async function signOut() {
		const { error } = await data.supabase.auth.signOut()
		console.log(error)
	}

	let showSaveConfirm = false
	async function saveData() {
		const { data: tableData, error } = await supabase
			.from('schedules')
			.select('schedule')
			.eq('email', session.user.email)

		if (tableData.length === 0) {
			const { data: tableData, error } = await supabase.from('schedules').insert([
				{
					email: session.user.email,
					schedule: sub
				}
			])
		} else if (isEqual(tableData[0].schedule, sub)) {
			console.log('no changes')
		} else {
			const { data: tableData, error } = await supabase
				.from('schedules')
				.update({ schedule: sub })
				.eq('email', session.user.email)
			console.log('saved')
		}
		showSaveConfirm = true
	}

	// async function readData() {
	// 	const { data: tableData, error } = await supabase
	// 		.from('schedules')
	// 		.select('schedule')
	// 		.eq('email', session.user.email)
	// 	console.log(tableData[0].schedule)
	// }

	onMount(async () => {
		if (session) {
			const { data: tableData, error } = await supabase
				.from('schedules')
				.select('schedule')
				.eq('email', session.user.email)
			if (tableData.length !== 0) {
				schedule.set(tableData[0].schedule)
			}
		}
	})
</script>

<div class="text-center">
	<div class="flex flex-col items-center">
		<h1 class="p-4">UIUC Class Planner</h1>
		{#if session}
			<h2>Hello, you are logged in as {session.user.email}</h2>
			<div class="flex flex-row p-4">
				<Button on:click={() => saveData()}>Save Schedule</Button>
				<Button kind="secondary" on:click={() => signOut()}>Log Out</Button>
			</div>
		{:else}
			<div class="p-4">
				<Button on:click={() => signInWithGoogle()}>Log in or sign up with Google</Button>
			</div>
		{/if}
	</div>
	<div class="flex flex-row overflow-x-scroll">
		{#each semesters as semester}
			<Semester semesterNum={semester} {classes} {schedule} />
		{/each}
	</div>
	<Intro />
	<Modal passiveModal bind:open={showSaveConfirm} modalHeading="">
		<div class="p-4">
			<h2 class="m-4">Your schedule has been saved!</h2>
			<Button kind="secondary" on:click={() => (showSaveConfirm = false)}>Close</Button>
		</div>
	</Modal>
</div>
