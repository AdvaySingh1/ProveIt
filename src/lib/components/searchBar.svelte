<script lang="ts">
  import { createEventDispatcher } from "svelte";
    

    const dispatch = createEventDispatcher();
    let search: String = "";

    const searchVal = () => {
        console.log(search);
        dispatch("searchVal", search);
    }

</script>


<div class="fixed top-24 w-3/12 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-4">
  <div class="flex items-center border-2 border-black rounded overflow-hidden">
    <input
      class="px-4 py-2 w-full"
      type="search"
      placeholder="Search..."
      bind:value={search}
      on:input={searchVal}
    />
    <button class="p-2" on:click={searchVal}>
      <svg 
        class="w-6 h-6 text-gray-500"
        fill="none"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path d="M15.5 15.5L19 19M10 18a8 8 0 100-16 8 8 0 000 16z"></path>
      </svg>
    </button>
  </div>
</div>