<script lang="ts">

    // TODO: consider making server side fetching for effeciency
import { onDestroy } from "svelte";
   import { db } from "$lib/database/fb-config";
  import { doc, onSnapshot } from 'firebase/firestore';
  import { page } from "$app/stores";
    // Real time subscription 
  let proof: any;
  let unsubscribe: () => void;


 $: {
    if ($page.params.id) {
     if (unsubscribe) {
        // If there is an existing subscription, unsubscribe before creating a new one
        unsubscribe();
      }

      let id = $page.params.id;
      const docRef = doc(db, 'proofs', id);


      // Setup your onSnapshot subscriber with the query
      unsubscribe = onSnapshot(docRef, (doc) => {
        console.log(doc.data(), doc.id)
        proof = doc.data();
        }), (error: any) => {
        console.error("Error fetching document:", error);
      };
    }
  }

  // Clean up the unsubscribe when the component is unmounted
  onDestroy(() => {
    if (unsubscribe) {
      unsubscribe();
    }
  });

    
</script>
<!-- Need if for initial load -->
{#if proof} 

<h1>{proof.Author}</h1>
{/if}