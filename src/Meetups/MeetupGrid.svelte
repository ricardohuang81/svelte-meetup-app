<script>
  import { createEventDispatcher } from 'svelte';
  import { scale } from 'svelte/transition';
  import { flip } from 'svelte/animate';
  import MeetupItem from './MeetupItem.svelte';
  import MeetupFilter from './MeetupFilter.svelte';
  import Button from '../UI/Button.svelte';

  export let meetups;

  const dispatch = createEventDispatcher();

  let favoritesOnly = false;

  $: filteredMeetups = favoritesOnly ? meetups.filter(meetup => meetup.isFavorite) : meetups;

  function setFilter(event) {
    favoritesOnly = event.detail === 1;

  }
</script>

<style>
	#meetups {
    width: 100%;
    display: grid;
    grid-template-columns: 1fr;
    grid-gap: 1rem;
  }
  #meetup-controls {
    margin: 1rem;
    display: flex;
    justify-content: space-between;
  }
  #no-meetups {
    margin: 1rem;
  }
  @media (min-width: 768px) {
    #meetups {
      grid-template-columns: repeat(2, 1fr);
    }
  }
</style>
<section id="meetup-controls">
  <MeetupFilter on:select={setFilter} />
  <Button on:click="{() => dispatch('add')}">
    New Meetdown
  </Button>
</section>
{#if filteredMeetups.length === 0}
  <p id="no-meetups">No meetdowns found, start adding!</p>
{/if}
<section id="meetups">
	{#each filteredMeetups as meetup (meetup.id)}
    <div transition:scale animate:flip={{duration: 300}}>
      <MeetupItem
        id={meetup.id}
        title={meetup.title}
        subtitle={meetup.subtitle}
        address={meetup.address}
        imageUrl={meetup.imageUrl}
        description={meetup.description}
        email={meetup.contactEmail}
        isFav={meetup.isFavorite}
        on:showdetails
        on:edit
      />
    </div>
	{/each}
</section>