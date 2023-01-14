<script>
	import { Button, Modal, ComboBox } from 'carbon-components-svelte';
	import { subject, num, numbers } from './stores.js';

	export let semesterNum, classes

	function shouldFilterItem(item, value) {
		if (!value) return true
		return item.text.toLowerCase().includes(value.toLowerCase())
	}

	let open = false
	// disable number combobox if subject isnt chosen
	$: disabled = $subject === undefined

	// change current number when the subject changes
	$: num.set($numbers[0])

	const subjects = Object.keys(classes)
</script>

<div>
	<h2>Semester {semesterNum}</h2>
	<Button on:click={() => open = true}>Add Class</Button>
	<Modal
		bind:open
		modalHeading='Add Class'
		primaryButtonText="Add"
		secondaryButtonText="Cancel"
		on:click:button--primary={() => open = false}
		on:click:button--secondary={() => open = false}
	>
		<div class='flex flex-row justify-around'>
			<div>
				<ComboBox
					titleText='Subject'
					placeholder='Select Subject'
					items={subjects.map(sub => ({id: sub, text: sub}))}
					bind:selectedId={$subject}
					on:clear={() => num.set("")}
					{shouldFilterItem}
				/>
			</div>
			<div>
				<ComboBox
					titleText='Number'
					items={$numbers.map(n => ({id: n, text: n}))}
					bind:selectedId={$num}
					disabled={disabled}
				/>
			</div>
		</div>
	</Modal>
</div>

<style>
    :global(.bx--modal-content) {
        overflow: visible;
    }

    :global(.bx--modal.is-visible .bx--modal-container) {
        overflow: visible;
    }
</style>