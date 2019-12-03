<script>
	import meetups from './Meetups/meetups-store.js';
	import Header from './UI/Header.svelte';
	import MeetupGrid from './Meetups/MeetupGrid.svelte';
	import TextInput from './UI/TextInput.svelte';
	import Button from './UI/Button.svelte';
	import EditMeetup from  './Meetups/EditMeetup.svelte';

	let loadedMeetups = meetups;

	// let meetups = [
	// 	{
	// 		id: 'm1',
	// 		title: 'Anime Club',
	// 		subtitle: 'Chill and Anime',
	// 		description: 'We talks about animes!',
	// 		imageUrl: 'https://media.giphy.com/media/3ohc0PsZLDN5Dgcf5e/giphy.gif',
	// 		address: '88 Hokage Road, Brooklyn, NY 11222',
	// 		contactEmail: 'ricky@anime.nyc',
	// 		isFavorite: false
	// 	},
	// 	{
	// 		id: 'm2',
	// 		title: 'Comics Club',
	// 		subtitle: 'Chill and Comics',
	// 		description: 'We talks about comics!',
	// 		imageUrl: 'https://media.giphy.com/media/9tZc9Mzo9K0yOYx38U/giphy.gif',
	// 		address: '88 Xavier Road, Queens, NY 11999',
	// 		contactEmail: 'ricardo@comics.nyc',
	// 		isFavorite: false
	// 	}
	// ];

	let editMode;

	function addMeetup (event) {
		const meetupData = {
			title: event.detail.title,
			subtitle: event.detail.subtitle,
			description: event.detail.description,
			imageUrl: event.detail.imageUrl,
			address: event.detail.address,
			contactEmail: event.detail.email
		};
		meetups.addMeetup(meetupData);
		editMode = null;
	}

	function toggleFavorite(event) {
		const id = event.detail;
		meetups.toggleFavorite(id);
	}

	function cancelEdit() {
		editMode = null;
	}
</script>

<style>
	main {
		margin-top: 5rem;
	}
	.meetup-controls {
		margin: 1rem;
	}
</style>

<Header />
<main>
	<div class="meetup-controls">
		<Button on:click="{() => editMode = 'add'}">
			New Meetdown
		</Button>
	</div>
	{#if editMode === 'add'}
		<EditMeetup on:save="{addMeetup}" on:cancel="{cancelEdit}" />
	{/if}
	<MeetupGrid meetups={$meetups} on:togglefavorite="{toggleFavorite}" />
	<!-- <MeetupGrid {meetups} /> -->
</main>


