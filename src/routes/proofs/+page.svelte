
<script lang="ts">
  import {serverTimestamp} from 'firebase/firestore'
    import { page } from "$app/stores";
  let proofs: any; // Assuming Guide is a TypeScript type that describes the shape of items in your guides array
  $: proofs = $page.data.props.proofs;

  let title = '';
  let subject = '';

  async function submitProof() {
    const proof = { Author: title, Subject: subject, Created: serverTimestamp()
 };
    
      const response = await fetch('/proofs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(proof),
      });

      if (!response.ok) {
        console.log('ewew')
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const result = await response.json();
      console.log('Proof added:', result);
      
      // Clear the form fields after successful submission
      title = '';
      subject = '';
    }
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

<form on:submit|preventDefault={submitProof}>
  <input 
    type="text" 
    bind:value={title} 
    placeholder="Title" 
  />
  <input 
    type="text" 
    bind:value={subject} 
    placeholder="Subject" 
  />
  <button type="submit" class="bg-slate-600">Submit Proof</button>
</form>


    
