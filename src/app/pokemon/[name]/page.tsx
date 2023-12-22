'use client';

import { useSearchParams } from 'next/navigation'
import { useState, useEffect } from 'react';
import { fetchAPI } from '../../../utils/fetch';

export default function Page() {

    interface Data {
        weight: number;
        name: string;
    }

    const [data, setData] = useState<Data | null>(null);
    const searchParams = useSearchParams()
    const id = searchParams.get('id')

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetchAPI(`${'https://pokeapi.co/api/v2/pokemon/' + id}`);
                setData(response);
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, []);

    return (
        <div>
            {data ? (
                <div className='pokemon-detail'>
                    <h1 className='title'>{data.name}</h1>
                    <p>weight : {data.weight}</p>
                </div>
            ) : (
                <p>Loading</p>
            )}
        </div>
    );
};