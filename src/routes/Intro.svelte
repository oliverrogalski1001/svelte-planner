<script>
	import { Button, Modal } from 'carbon-components-svelte'

	let open = true
</script>

<Modal passiveModal bind:open modalHeading="">
	<h1 class="mb-3 mx-1">Welcome to the unofficial UIUC Course Planner</h1>
	<h5 class="mb-3 font-light">
		You can add classes to a semester, drag and drop classes around, and create custom classes if they are not
		available.
	</h5>
	<h5 class="mb-3 font-light">
		Copy the link or sign up with Google to save your schedule if you want to continue planning your schedule later or
		share it with your friends.
	</h5>
	<Button on:click={() => (open = false)}>Get Started</Button>
</Modal>
