<script lang="ts">
  import { auth } from "$lib/database/fb-config";
  import { onAuthStateChanged } from "firebase/auth";
  import { onDestroy, onMount } from "svelte";
  import Register from "$lib/components/register.svelte";

  let uid: any;
  let showReg: Boolean = false;
  let regForm: Boolean = false;


let unsubAuth =  onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/auth.user
    uid = user.uid;
    showReg = false;
    // ...
  } else {
    showReg = true;
    // User is signed out
    // ...
  }
});

onDestroy(() => {
  unsubAuth();
})


</script>

{#if showReg}
  <button class="relative top-3 left-3/4 bg-blue-700 text-white" on:click={() => {regForm = !regForm;}}>Register</button>
{/if}

<Register regForm={regForm} on:formClose={() => {regForm = !regForm;}}/>


  <div >
    <div class="title" class:invisible={regForm}>
<h1 class="text-3xl font-bold underline text-stone-950">
  Welcome {uid? uid: ''} to ProveIt
</h1>
<a href="/guides"><button class="text-3xl font-bold underline text-stone-950">Guides</button></a>
</div>
  </div>


<style lang="postcss">
  :global(html) {
     background-color: theme(colors.gray.100); 
    background-image: url("$lib/bg-graph.svg");
  }

  .title{
    position: relative;
    left: 40%;
    top: 200px;
  }
</style>