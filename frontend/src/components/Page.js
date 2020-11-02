import React, { useEffect, useState, useCallback } from "react";
import firebase from "firebase";
import { Button } from "react-bootstrap";
import firebaseConfig from "../firebaseConfig.js";

const Page = ({ location }) => {
    const [ data, setDate ] = useState("");

    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
    }
    const firestore = firebase.firestore()
    const collRef = firestore.collection("pages");

    const clickHandler = () => {
        let vals = document.querySelector("textarea").value
        let loc = location.pathname.slice(1);

        collRef.doc(loc).set({
            pageContent: vals
        })
        .then(() => {
            console.log("Data submitted!")
        })
        .catch(e => {
            console.log(e)
        })
    }

    function debounce(func, wait) {
        let timeout;
        return function() {
          const context = this;
          const args = arguments;
          const later = function() {
            timeout = null;
            func.apply(context, args);
          };
          clearTimeout(timeout);
          timeout = setTimeout(later, wait);
        };
    };

    const debouncer = async () => {
        debounce(await clickHandler, 1000);
    }
    const onFieldChange = async () => {
        await debouncer();
    }

    useEffect(() => {
        let loc = location.pathname.slice(1);
        console.log("loc", loc)
        console.log(collRef.doc(loc))

        try {
            (async function(){
                const collection = collRef.doc(loc)
                const firestoreData = await collection.get();
                document.querySelector("textarea").value = firestoreData.data().pageContent;
            })();
        } catch(err) {
            throw new Error(err);
        }
    }, [])
      
    return (
        <div>
            <h2 className="pt-4">Welcome to {location.pathname}!</h2>
            <p className="mb-3">Your notes will automatically save as your type</p>
            <textarea onChange={onFieldChange} className="border"></textarea>
        </div>
    )
}

export default Page
