
<script lang="ts">
  import time from "$lib/functions/time";
  import { page } from "$app/stores";
  import EditFrom from "./editFrom.svelte";
  import AddForm from "./addForm.svelte";
  import { onDestroy } from "svelte";
   import db from "$lib/database/fb-config";
  import { collection, query, onSnapshot } from 'firebase/firestore';
  let proofs: any;
  $: proofs = $page.data.props.proofs;


  let showEditForm: boolean = false;
  let showAddForm: boolean = false;
  let proofToEdit: object = {};


  async function addProof(e: any) {
    showAddForm = !showAddForm
    const proof = { Author: e.detail.name, Subject: e.detail.subject, Created: Date.now()
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
      if (unsubscribe) unsubscribe();
  });



</script>

<button class="absolute my-3 rounded-full size-10 right-3 bg-blue-600 text-white" on:click={() => {showAddForm = !showAddForm;}}>+</button>

  {#if proofs.length > 0}
   <ul class=" my-20 relative">
     {#each proofs as proof (proof.id)}
      <li class="relative top-1 my-10 bg-blue-100">
        <a href={`/proofs/${proof.id}`}>
          <h1>{proof.Author}</h1>
          <p>Proof about {proof.Subject} was created at {time(proof.Created)}</p>.
          <button on:click={() => deleteProof(proof.id)} class="relative right-0 top-0">Delete</button>
          <button on:click={() => handleEdit(proof)} class="relative right-0 bottom-0">Edit</button>
        </a>
    
      </li>
    {:else}
        <h1>There are no proofs as of now</h1>
    {/each} 
    </ul>
{/if}






{#if showEditForm}
  <EditFrom proof={proofToEdit} on:handleEdit={editProof} on:handleClose={() => handleEdit(proofToEdit)}/>
{/if}

{#if showAddForm}
  <AddForm on:addEvent={addProof} on:closeFrom={() => {showAddForm = !showAddForm}}/>
{/if}


    
