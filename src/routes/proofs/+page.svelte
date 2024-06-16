
<script lang="ts">
  import time from "$lib/functions/time";
  import { page } from "$app/stores";
  import EditFrom from "./editFrom.svelte";
  import { onDestroy } from "svelte";
   import db from "$lib/database/fb-config";
  import { collection, query, onSnapshot } from 'firebase/firestore';
  let proofs: any;
  $: proofs = $page.data.props.proofs;

  let title = '';
  let subject = '';
  let showEditForm: boolean = false;
  let proofToEdit: object = {};

  async function submitProof() {
    const proof = { Author: title, Subject: subject, Created: Date.now()
 };
    
      const response = await fetch('/proofs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(proof),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      // const result = await response.json();
      // console.log('Proof added:', result);
      
      // Clear the form fields after successful submission
      title = '';
      subject = '';
    }
  async function deleteProof(id: string) {
    const response = await fetch(`/proofs/${id}`, {
        method: 'DELETE',
      });
  }

  function handleEdit(proof: object){
    showEditForm = !showEditForm;
    proofToEdit = proof;
    }
  async function editProof(e: any){
    showEditForm = !showEditForm
    const response = await fetch(`/proofs/${e.detail.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(e.detail),
      });
  }

// Real time subscription 
  const proofsCollection = collection(db, 'proofs');
  const q = query(proofsCollection);

  // Setting up reactive statement for Firestore subscription
  $: unsubscribe = onSnapshot(q, (snapshot) => {
    proofs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  });

    onDestroy(() => {
    unsubscribe();
  });



</script>

<p>
  {#if proofs}
     {#each proofs as proof (proof.id)}
     <ul class="bg-blue-200">
      <li class="relative my-10">
        <h1>{proof.Author}</h1>
        <p>Proof about {proof.Subject} was created at {time(proof.Created)}</p>.
        <button on:click={() => deleteProof(proof.id)} class="relative right-0 top-0">Delete</button>
        <button on:click={() => handleEdit(proof)} class="relative right-0 bottom-0">Edit</button>
      </li>
     </ul>
    {:else}
        <h1>There are no proofs as of now</h1>
    {/each} 
{/if}
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


{#if showEditForm}
  <EditFrom proof={proofToEdit} on:handleEdit={editProof} on:handleClose={() => handleEdit(proofToEdit)}/>
{/if}



    
