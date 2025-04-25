import React from "react";
import { useRouter } from "next/navigation";


export default function Hero() {
    const router = useRouter();

    return (
        <>

        <div>
            <h1>Hello!</h1>
            <div className="buttons flex gap-2 items-center justify-center">
                <button onClick={() => router.push('/Pathfinder')}>Go to PathFinder</button>
                <button onClick={() => router.push('/Sorter')}>Go to Sorter</button>
            </div>
        </div>
        </>
    )
}