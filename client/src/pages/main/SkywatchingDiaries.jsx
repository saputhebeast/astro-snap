import React from 'react'
import Header from "@/components/layout/Header.jsx";

const SkywatchingDiaries = () => {
    return (
        <>
            <Header />
            <div className="max-w-4xl mx-auto p-4 mt-8 rounded-lg">
                <h1 className="text-2xl font-bold text-center mb-4">Skywatching Diaries</h1>
                <p>Allow users to create accounts to keep a diary of their skywatching experiences. They can log
                    observations, upload their own night-sky photos, and share insights with the community.</p>
            </div>
        </>
    )
}

export default SkywatchingDiaries
