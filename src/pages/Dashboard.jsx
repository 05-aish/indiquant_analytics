import React, { useState } from 'react'
import StatCards from '../components/StatCards'
import GrowthChart from '../components/GrowthChart'
import { useMetrics } from '../hooks/useMetrics'
import { useContributors } from '../hooks/useContributors'
import { useSubmissions } from '../hooks/useSubmissions'
import EngagementChart from '../components/EngagementChart'
import DomainChart from '../components/DomainChart'
import LeaderboardChart from '../components/LeaderboardChart'
import ContributorsTable from '../components/ContributorsTable'
import SubmissionForm from '../components/SubmissionForm'


const Dashboard = () => {
  const { metrics } = useMetrics();
  const { contri, refetch: refetchContri } = useContributors();
  const { subs, refetch: refetchSubs } = useSubmissions();

  const [showForm, setShowForm ] = useState(false);
  return (
    <div className="min-h-screen bg-[#0a0a0f] px-8 pb-8 pt-4">

        <div className="mb-8 flex w-full justify-between items-start pb-2 border-b border-blue-300">
            
            <span className='text-white text-2xl'>INDIQUANT</span>
            
            <div className='text-right'>
                    <h1 className='text-gray-400'>IndiMinds 2026, Tournament Analytics</h1>
                    <p className=' text-gray-400 text-sm '>Live ecosystem performance and contributor insights</p>
            </div>    
        </div>

        <StatCards onOpen={() => setShowForm(true)}/>
        {showForm && <SubmissionForm onClose={() => setShowForm(false)} refetchContri={refetchContri}
    refetchSubs={refetchSubs} />}
        <div className="grid grid-cols-2 gap-6 mt-6">
          <GrowthChart metrics={metrics}/>
          <EngagementChart/>
        </div>

        <div className="grid grid-cols-2 gap-6 mt-6">
          <DomainChart contri={contri}/>
          <LeaderboardChart contri={contri} subs={subs}/>
          
        </div>
    </div>
  )
}

export default Dashboard