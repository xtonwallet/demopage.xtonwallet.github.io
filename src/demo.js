import DemoPage from './components/DemoPage.svelte';
import { writable } from 'svelte/store';

const loaded = writable(false);

window.addEventListener('load', () => {
  try{
    loaded.set(true);
  } catch (e) {
    console.log(e);
  }
});

new DemoPage({
  target: document.body,
  props: {loaded}
});
