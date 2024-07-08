import React, { useState } from 'react';
import axios from 'axios';

export default function Finance() {
    const [hash, setHash] = useState('');

    const handleFileChange = async (event) => {
        const file = event.target.files[0];
        const formData = new FormData();
        formData.append('file', file);
        try {
            const response = await axios.post('http://127.0.0.1:8000/get_img_hash', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            const hash = response.data.output;
            setHash(hash);
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <main className='dark:text-white mt-20'>
            <h1>Finance</h1>
            <input
                type="file"
                accept=".png"
                requierd
                onChange={handleFileChange}
            />
            <p>{hash}</p>
        </main>
    )
}