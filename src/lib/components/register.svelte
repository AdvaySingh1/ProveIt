<script lang="ts">
    import { db, auth, people } from "$lib/database/fb-config";
    import { 
    getAuth,
    createUserWithEmailAndPassword,
    onAuthStateChanged
    } from 'firebase/auth';
    import { createEventDispatcher } from "svelte";
    import { doc, setDoc, addDoc } from "firebase/firestore";
    export let regForm : Boolean = false;
    let dispatch = createEventDispatcher();

    let username: string;
    let email: string;
    let password: string;



    const handleRegister = async () => {
        try{
        // create auth user
        let cred = await createUserWithEmailAndPassword(auth, email, password);

        let userDocRef = doc(people, cred.user.uid);

        // set the doc
        await setDoc(userDocRef, { Name: username, uid: cred.user.uid });
        console.log(`${username} registered with UID: ${cred.user.uid}`);
        } catch (err) {
        console.log(err);
        }
        email = ''; password = ''; username = '';
    }


</script>



    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <!-- svelte-ignore a11y-no-static-element-interactions -->
{#if regForm}
<div class="backdrop" on:click|self={() => {regForm = !regForm; dispatch("formClose");}} >
    <form on:submit|preventDefault={handleRegister} class="relative p-8 rounded-lg w-8/12 h-auto mx-auto my-10 flex flex-col justify-between items-center bg-white shadow-lg">
        <div class="w-full mb-4">
            <label for="username" class="block text-sm font-bold mb-2">Username</label>
            <input 
                bind:value={username}
                type="text" 
                placeholder="Your username"
                class="border-2 border-black w-full p-2 rounded-md text-gray-700 focus:ring-blue-500 focus:border-blue-500"
                id="username"
            >
        </div>
        <div class="w-full mb-4"> 
            <label for="email" class="block text-sm font-bold mb-2">Email</label>
            <input 
                bind:value={email}
                type="email" 
                placeholder="example@math.com"
                class="border-2 border-black w-full p-2 rounded-md text-gray-700 focus:ring-blue-500 focus:border-blue-500"
                id="email"
            >
        </div>
        <div class="w-full mb-8">
            <label for="password" class="block text-sm font-bold mb-2">Password</label>
            <input 
                bind:value={password}
                type="password"
                class="border-2 border-black w-full p-2 rounded-md text-gray-700 focus:ring-blue-500 focus:border-blue-500"
                id="password"
            >
        </div>
        <button 
            type="submit"
            class="w-1/2 p-2 bg-blue-700 text-white font-bold rounded-md hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300"
        >
            Register
        </button>
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


</style>