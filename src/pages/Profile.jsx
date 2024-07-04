import React from 'react';
import { useParams } from 'react-router-dom';

export default function Profile() {
    const userAdd = useParams();

    return (
        <main>This is a Profile Page! {userAdd}</main>
    )
}