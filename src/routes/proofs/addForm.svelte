<script lang="ts">

  import { createEventDispatcher, type EventDispatcher } from "svelte";
  let subject: string;
  let name: string;

  let dispatch: EventDispatcher<any> = createEventDispatcher();


    const addEvent = () => {
        dispatch("addEvent", {name, subject});
        subject = '';
        name = '';
    }

    const closeForm = () =>{
      dispatch("closeFrom");
      // TODO: optinally clear out the subject and the name
    }



</script>


<form
  on:submit|preventDefault={addEvent}
  class="fixed inset-x-0 bottom-0 mx-auto w-full max-w-md p-4 bg-white border-2 border-black shadow-lg"
>

  <button
    type="button" 
    class="absolute top-2 right-2 inline-flex items-center justify-center w-8 h-8 bg-red-600 text-white rounded-full hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500" 
    on:click={closeForm}
  >
    &#10005; <!-- This is a unicode "X" character -->
  </button>

  <div class="mb-2">
    <label for="nm" class="block text-sm font-medium text-gray-700">Name</label>
    <input
      type="text"
      placeholder="Enter name"
      id="nm"
      class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
      bind:value={name}
    />
  </div>
  <div class="mb-4">
    <label for="sub" class="block text-sm font-medium text-gray-700">Subject</label>
    <input
      type="text"
      aria-placeholder="Subject"
      id="sub"
      class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
      bind:value={subject}
    />
  </div>
  <button
    type="submit"
    class="w-full flex justify-center items-center px-4 py-2 bg-slate-600 text-white font-medium rounded-md hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500"
  >
    Submit Proof
  </button>
</form>