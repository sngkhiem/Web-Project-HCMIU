import React from 'react'

import { TrashIcon } from '@heroicons/react/24/outline'

const WatchListPage = () => {
    return (
        <div className="bg-black h-screen text-white">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
                <h1 className="text-2xl font-bold mb-5">Your Watch List</h1>
                <div className="flex flex-col gap-3">
                    <div className="flex items-center justify-between px-5 py-2 rounded-lg bg-pm-purple">
                        <div className="flex gap-3">
                            <img src="../assets/chimsau.png" alt="Thumbnail" className="w-32 aspect-[16/9]" />
                            <span className="text-xl font-semibold">Title</span>
                        </div>
                        <div>
                            <button className="p-2 hover:bg-red-400 rounded-full transition-colors cursor-pointer">
                                <TrashIcon className="w-5" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default WatchListPage
