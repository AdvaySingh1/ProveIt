<!-- src/routes/somepage/+page.svelte -->
<!-- <script context="module" lang="ts">

</script> -->
<script lang="ts">
    import { page } from "$app/stores";
  let guides; // Assuming Guide is a TypeScript type that describes the shape of items in your guides array
  $: guides = $page.data.props.guides;
  console.log(guides);
</script>

{#if guides}
  <!-- We're now using `guides` hence the export is used -->
  <ul>
    {#each guides as guide}
      <li>{guide.title}</li>
    {/each}
  </ul>
{:else}
  <p>No guides found hre.</p>
{/if}