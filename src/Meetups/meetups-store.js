import { writable } from 'svelte/store';

const meetups = writable([
  {
    id: 'm1',
    title: 'Anime Club',
    subtitle: 'Chill and Anime',
    description: 'We talks about animes!',
    imageUrl: 'https://media.giphy.com/media/3ohc0PsZLDN5Dgcf5e/giphy.gif',
    address: '88 Hokage Road, Brooklyn, NY 11222',
    contactEmail: 'ricky@anime.nyc',
    isFavorite: false
  },
  {
    id: 'm2',
    title: 'Comics Club',
    subtitle: 'Chill and Comics',
    description: 'We talks about comics!',
    imageUrl: 'https://media.giphy.com/media/9tZc9Mzo9K0yOYx38U/giphy.gif',
    address: '88 Xavier Road, Queens, NY 11999',
    contactEmail: 'ricardo@comics.nyc',
    isFavorite: false
  }
]);

const customMeetupStore = {
  subscribe: meetups.subscribe,
  addMeetup: (meetupData) => {
    const newMeetup = {
      id: Math.random().toString(),
      ...meetupData,
      isFavorite: false
    };
    meetups.update(items => {
      return [newMeetup, ...items];
    })
  },
  updateMeetup: (id, meetupData) => {
    meetups.update(items => {
      const meetupIndex = items.findIndex(item => item.id === id);
      const updatedMeetup = { ...items[meetupIndex], ...meetupData };
      const updatedMeetups = [...items];
      updatedMeetups[meetupIndex] = updatedMeetup;
      return updatedMeetups;
    });
  },
  removeMeetup: (id) => {
    meetups.update(items => {
      return items.filter(item => item.id !== id);
    });
  },
  toggleFavorite: (id) => {
    meetups.update(items => {
      const updatedMeetup = { ...items.find(meetup => meetup.id === id) };
      updatedMeetup.isFavorite = !updatedMeetup.isFavorite;
      const meetupIndex = items.findIndex(meetup => meetup.id === id);
      const updatedMeetups = [...items];
      updatedMeetups[meetupIndex] = updatedMeetup;
      return updatedMeetups;
    });
  }
};

export default customMeetupStore;