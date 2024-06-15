
<script lang="ts">
    import { page } from "$app/stores";
  let proofs; // Assuming Guide is a TypeScript type that describes the shape of items in your guides array
  $: proofs = $page.data.props.proofs;
</script>

<p>
  {#if proofs}
     {#each proofs as proof (proof.id)}
        <h1>{proof.Author}</h1>
    {:else}
        <h1>There are no proofs as of now</h1>
    {/each} 
{/if}
    <a href="/"><button>Hello there</button></a>
  
</p>


    
