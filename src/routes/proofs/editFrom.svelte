<script lang="ts">

    export let proof;
    let subject: String = proof.Subject;

  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();

    const handleSubmit = () => {
        dispatch("handleEdit", {... proof, Subject: subject});
    }

    const handleClose = () => {
        dispatch("handleClose");
    }

</script>

<form on:submit|preventDefault={handleSubmit} class="fixed top-28 right-3 bg-slate-100 p-4 w-96 h-auto min-h-[200px] flex flex-col justify-between">
    <div class="form-content space-y-4 mb-4">
        <label for="sub">Subject</label>
        <input type="text" id="sub" bind:value={subject}>
    </div>
      <button
    type="button"
    class="absolute top-2 right-2 text-white bg-transparent hover:bg-slate-600 p-1 rounded-full text-sm leading-none"
    on:click={handleClose}
  >
    X
  </button>

    <button type="submit" class="bg-blue-600 text-white font-bold py-2 rounded hover:bg-blue-700 transition duration-150">
        Submit
    </button>
</form>