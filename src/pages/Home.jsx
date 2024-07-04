import { useState } from 'react';

// Importing components
import WalletButton from '../components/WalletButton';
import Balance from '../components/Balance';
import ContractInteraction from '../components/ContractInteraction';

export default function Home() {
    return (
        <main className='text-black bg-white dark:text-white dark:bg-black'>
            <WalletButton />
            <Balance />
            <ContractInteraction />
        </main>
    );
}