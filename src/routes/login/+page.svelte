<!-- 

 <script context="module">
    import { initializeApp } from "firebase/app";

import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  
} from "firebase/firestore";

    export async function dataInit(){
        try{
            const firebaseConfig = {
    apiKey: "AIzaSyAzEiz-_IZBznyAhR4Ztotvixa9LJ1NIP0",
    authDomain: "proveit-492e4.firebaseapp.com",
    projectId: "proveit-492e4",
    storageBucket: "proveit-492e4.appspot.com",
    messagingSenderId: "940720500143",
    appId: "1:940720500143:web:0eba22a9eecb4f003bd35a",
  };

  // Initialize Firebase
  initializeApp(firebaseConfig);
  console.log("hello");
    const db = getFirestore();
    const proofCol = collection(db, "proofs");

    getDocs(proofCol)
      .then((snapshot) => {
        // console.log(snapshot.docs)
        /**
         * @type {any[] | PromiseLike<any[]>}
         */
        let proofs = [];
        snapshot.docs.forEach((doc) => {
          proofs.push({ ...doc.data(), id: doc.id });
        });
        console.log(proofs);
        return {
            props:{
                proofs,
            } 
        }
      })
      .catch((err) => {
        console.log(err.message);
        return(err);
      });
        }
        catch (err) {
            console.log(err);
            return (err);
        }
    }
    
</script>  -->

<script lang="ts">
       import { initializeApp } from "firebase/app";

import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  
} from "firebase/firestore";
let proofs: Array<any> = [];


        try{
            const firebaseConfig = {
    apiKey: "AIzaSyAzEiz-_IZBznyAhR4Ztotvixa9LJ1NIP0",
    authDomain: "proveit-492e4.firebaseapp.com",
    projectId: "proveit-492e4",
    storageBucket: "proveit-492e4.appspot.com",
    messagingSenderId: "940720500143",
    appId: "1:940720500143:web:0eba22a9eecb4f003bd35a",
  };

  // Initialize Firebase
  initializeApp(firebaseConfig);
  console.log("hello");
    const db = getFirestore();
    const proofCol = collection(db, "proofs");

    getDocs(proofCol)
      .then((snapshot) => {
        proofs = snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
      })
      .catch((err) => {
        console.log(err.message);
      });
        }
        catch (err) {
            console.log(err);
        }
    
</script>

<h1 class="text-black">
     {#each proofs as proof (proof.id)}
        <h1>{`${proof.Author} has written a proof about ${proof.Subject} at ${proof.Created}`}</h1>
    {:else}
        <h1>There are no proofs as of now</h1>
    {/each} </h1>