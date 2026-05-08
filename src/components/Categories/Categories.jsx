import React, { useEffect, useState } from 'react';
import style from './Categories.module.css';

export default function Categories() {
    let [count, setCount] = useState(0);

    useEffect(() => {

    }, []);
    
    return (
        <>
            <h1>Categories</h1>
            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Fugiat molestiae exercitationem, porro laboriosam debitis soluta aliquam ullam vitae in praesentium perspiciatis unde odio impedit quas! Dolores consectetur perspiciatis ad inventore?</p>
        </>
    )
}