<script>
  import { createEventDispatcher } from 'svelte';
  import TextInput from '../UI/TextInput.svelte';
  import Button from '../UI/Button.svelte';
  import Modal from '../UI/Modal.svelte';
  import { isEmpty, isValidEmail } from '../helpers/validation.js';

  let title = '';
  let subtitle = '';
  let description = '';
  let imageUrl = '';
  let address = '';
  let email = '';

  const dispatch = createEventDispatcher();

  $: titleValid = !isEmpty(title);
  $: subtitleValid = !isEmpty(subtitle);
  $: descriptionValid = !isEmpty(description);
  $: imageUrlValid = !isEmpty(imageUrl);
  $: addressValid = !isEmpty(address);
  $: emailValid = isValidEmail(email);
  $: formIsValid = titleValid && subtitleValid && descriptionValid && imageUrlValid && addressValid && emailValid;

  function submitForm () {
    dispatch('save', {
      title: title,
      subtitle: subtitle,
      description: description,
      imageUrl: imageUrl,
      address: address,
      email: email
    });
  }

  function cancel () {
    dispatch('cancel');
  }
</script>

<style>
  form {
		width: 100%;
	}
</style>

<Modal title="Enter Meetdown Info" on:cancel>
  <form on:submit|preventDefault="{submitForm}">
      <TextInput
        id="title"
        label="Title"
        valid={titleValid}
        validityMessage="Please enter valid title!"
        value={title}
        on:input={event => (title = event.target.value)}
      />
      <TextInput
        id="subtitle"
        label="Subtitle"
        valid={subtitleValid}
        validityMessage="Please enter valid subtitle!"
        value={subtitle}
        on:input={event => (subtitle = event.target.value)}
      />
      <TextInput
        id="address"
        label="Address"
        valid={addressValid}
        validityMessage="Please enter valid address!"
        value={address}
        on:input={event => (address = event.target.value)}
      />
      <TextInput
        id="imageUrl"
        label="Image URL"
        valid={imageUrlValid}
        validityMessage="Please enter valid image URL!"
        value={imageUrl}
        on:input={event => (imageUrl = event.target.value)}
      />
      <TextInput
        id="email"
        label="Email"
        type="email"
        valid={emailValid}
        validityMessage="Please enter valid email address!"
        value={email}
        on:input={event => (email = event.target.value)}
      />
      <TextInput
        id="description"
        label="Description"
        controlType="textarea"
        valid={descriptionValid}
        validityMessage="Please enter valid description!"
        bind:value={description}
      />
    </form>
    <div slot="footer">
      <Button type="button" mode="outline" on:click="{cancel}">Cancel</Button>
      <Button type="button" on:click="{submitForm}" disabled={!formIsValid}>Save</Button>
    </div>
  </Modal>