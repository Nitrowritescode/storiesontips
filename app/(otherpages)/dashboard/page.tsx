import React from 'react';
import DashboardHeader from './_components/DashboardHeader';
import UserStoryList from './_components/UserStoryList';


export const metadata = {
  title: "User Dashboard",
  description: "View and manage your AI-generated stories on the user dashboard.",
};


export default function Dashboard() {
  return (
    <div className='min-h-screen mx-auto px-4 md:px-8 lg:px-12'>
       <h2 className='text-4xl font-bold text-center text-white py-2 md:py-4 lg:py-6'>Dashboard</h2>
        <DashboardHeader/>
        <UserStoryList/>
    </div>
  )
}

