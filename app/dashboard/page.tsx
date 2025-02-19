import React from 'react';
import DashboardHeader from './_components/DashboardHeader';
import UserStoryList from './_components/UserStoryList';


export const metadata = {
  title: "User Dashboard",
  description: "View and manage your AI-generated stories on the user dashboard.",
};


export default function Dashboard() {
  return (
    <div className='p-10 md:px-20 lg:px-40 min-h-screen bg-fancy'>
       <h2 className='text-4xl font-bold text-center text-white py-2 md:py-4 lg:py-6'>Dashboard</h2>
        <DashboardHeader/>
        <UserStoryList/>
    </div>
  )
}

