<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import { auth } from "$lib/database/fb-config";

    export let proof;

    const dispatch = createEventDispatcher();

    function deleteProof() {
        dispatch("deleteProof")
    }
    function handleEdit() {
        dispatch("handleEdit");
    }




</script>

<li class="relative my-10">
  <div class="p-6 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md hover:bg-blue-50">
    <a href={`/proofs/${proof.id}`} class="block hover:no-underline">
      <h1 class="text-2xl font-bold tracking-tight text-gray-900">{proof.Name}</h1>
      <p class="block mt-2 text-gray-600">
        Author: {proof.Author}<br>
        Subject: {proof.Subject}<br>
        Created: {proof.Created}
      </p>
      <p class="mt-3 text-gray-700">{proof.Description}</p>
    </a>
    {#if auth.currentUser?.uid && auth.currentUser?.uid === proof.Id}
      <div class="flex justify-end space-x-4 mt-4">
        <button on:click={deleteProof} class="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300">
          Delete
        </button>
        <button on:click={handleEdit} class="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300">
          Edit
        </button>
      </div>
    {/if}
  </div>
</li>