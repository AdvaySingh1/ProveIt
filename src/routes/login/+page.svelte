<script lang="ts">
  import { auth } from "$lib/database/fb-config";
  import {
  getAuth,
  signInWithEmailAndPassword, signOut,
  onAuthStateChanged
  } from 'firebase/auth'



let email: string = '';
let password: string = '';
let cred: any = ''

const handleLogin = async () => {
  try{
    cred = await signInWithEmailAndPassword(auth, email, password);
    console.log(cred);
    email = '';
    password = '';
  }
  catch (e) {
    alert('user not found.');
  }
}

const handleLogout = async () => {
  try {  
    await signOut(auth);
    console.log('signed out');
  }
  catch (e: any) {
    alert (e.message);
  }
}
</script>

<form on:submit|preventDefault={handleLogin} class="relative p-8 rounded-lg w-8/12 h-4/6 mx-auto my-10 flex flex-col justify-between items-center bg-white shadow-lg">
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
        Submit
    </button>
</form>


<form on:submit|preventDefault={handleLogout} class="relative p-8 rounded-lg w-8/12 h-4/6 mx-auto my-10 flex flex-col justify-between items-center bg-white shadow-lg">
    
    <button 
        type="submit"
        class="w-1/2 p-2 bg-blue-700 text-white font-bold rounded-md hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300"
    >
        Sign out
    </button>
</form>