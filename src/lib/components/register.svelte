<script lang="ts">
    import { db, auth } from "$lib/database/fb-config";
  import { createEventDispatcher } from "svelte";
    export let regForm : Boolean = false;
    let dispatch = createEventDispatcher();


    let email: String;
    let password: String;
</script>



    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <!-- svelte-ignore a11y-no-static-element-interactions -->
{#if regForm}
<div class="backdrop" on:click|self={() => {regForm = !regForm; dispatch("formClose");}} >
    <form class="p-2.5 rounded-lg w-8/12 h-4/6 mx-auto my-10 text-center bg-opacity-100 flex justify-center items-center bg-white">
        <label for="email">Email</label>
        <input bind:value={email} type="text" placeholder="example@math.com" class="border-black">
        <label for="password">password</label>
        <input bind:value={password} type="text" class="border-black">
        <button class="absolute bottom-1 justify-center bg-blue-700 text-white"></button>
    </form>
</div>
{/if}

<style>
    .backdrop{
    width: 100%;
    height: 100%;
    position: fixed;
    background: rgba(0,0,0,0.8);
    }

    /* .model{
        padding: 10px;
        border-radius: 10px;
        max-width: 400px;
        margin: 10% auto;;
        text-align: center;
        background: white;
    } */

</style>