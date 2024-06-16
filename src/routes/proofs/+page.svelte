
<script lang="ts">
  import time from "$lib/functions/time";
  import { page } from "$app/stores";
  import EditFrom from "./editFrom.svelte";
  import AddForm from "./addForm.svelte";
  import { onDestroy } from "svelte";
  import { db } from "$lib/database/fb-config";
  import { collection, query, onSnapshot, where, orderBy, Query } from 'firebase/firestore';
  import SearchBar from "$lib/components/searchBar.svelte";
  let proofs: any;
  $: proofs = $page.data.props.proofs;


  let showEditForm: boolean = false;
  let showAddForm: boolean = false;
  let proofToEdit: object = {};
  let unsubdb: any;


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
  let search: any;
  let q: Query = query(proofsCollection, orderBy("Created"));
  // $: {
  //   search? q = query(
  //   proofsCollection,
  //   where("Author", "<=", search),
  //   where("Author", ">=", search),
  //   //where(search, "in", "Subject"),
  //   orderBy("Created")
  // ) : q = query(proofsCollection, orderBy("Created"));
  // }


  // Setting up reactive statement for Firestore subscription
  $: {
    unsubdb = onSnapshot(q, (snapshot) => {
    proofs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    
    search ?
    proofs = proofs.filter((doc: any) =>
  doc.Author.toLowerCase().includes(search.toLowerCase())
) : proofs ;
  });

}




    onDestroy(() => {
      if (unsubdb) unsubdb();
  });



</script>

<button class="absolute my-3 rounded-full size-10 right-3 bg-blue-600 text-white" on:click={() => {showAddForm = !showAddForm;}}>+</button>

<SearchBar on:searchVal={(e) => search = e.detail}/>
  {#if proofs.length > 0}
   <ul class=" my-20 relative">
     {#each proofs as proof (proof.id)}
     <!-- TODO: add preloading data on hoever (server side for [id]) -->
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

<!-- TODO add img/text when there are no proofs related to topic or person -->






{#if showEditForm}
  <EditFrom proof={proofToEdit} on:handleEdit={editProof} on:handleClose={() => handleEdit(proofToEdit)}/>
{/if}

{#if showAddForm}
  <AddForm on:addEvent={addProof} on:closeFrom={() => {showAddForm = !showAddForm}}/>
{/if}


    
