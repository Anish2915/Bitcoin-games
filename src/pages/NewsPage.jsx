import React from 'react';
import { useParams } from 'react-router-dom';

export default function NewsPage() {
    const feedId = useParams();

    return (
        <main>
            This is the perticular news page! {feedId}
        </main>
    )
}