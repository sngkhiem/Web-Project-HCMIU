import React, { useState, useEffect } from 'react';
import { motion } from "framer-motion";

import CreateVideoForm from "../components/CreateVideoForm";

import { useVideoStore } from "../stores/useVideoStore";

const tabs = [
	{ id: "create", label: "Create Video"},
	{ id: "videos", label: "Videos"},
];

const AdminPage = () => {
    const [activeTab, setActiveTab] = useState("create");
	const { fetchAllVideos } = useVideoStore();

	useEffect(() => {
		fetchAllVideos();
	}, [fetchAllVideos]);

    return (
		<div className='min-h-screen relative overflow-hidden'>
			<div className='relative z-10 container mx-auto px-4 py-12'>
				<motion.h1
					className='text-4xl font-bold mb-8 text-pm-purple text-center'
					initial={{ opacity: 0, y: -20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8 }}
				>
					Admin Dashboard
				</motion.h1>

				<div className='flex justify-center mb-8'>
					{tabs.map((tab) => (
						<button
							key={tab.id}
							onClick={() => setActiveTab(tab.id)}
							className={`flex items-center px-4 py-2 mx-2 rounded-md transition-colors duration-200 ${
								activeTab === tab.id
									? "bg-pm-purple text-white"
									: "bg-pm-purple-hover text-gray-300 hover:bg-brown-600"
							}`}
						>
							{tab.label}
						</button>
					))}
				</div>
				{activeTab === "create" && <CreateVideoForm />}
			</div>
		</div>
    )
}

export default AdminPage
