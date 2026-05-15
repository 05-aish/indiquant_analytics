import React from 'react';
import { useState } from 'react';
import { useContributors } from '../hooks/useContributors';
import { BarChart,  Bar,  XAxis,  YAxis,  Tooltip, ResponsiveContainer,  CartesianGrid } from 'recharts';
import ContributorsTable from './ContributorsTable';


const LeaderboardChart = () => {
    const { contri, contriloading } = useContributors();
    const topContri = contri.sort((a, b) => b.score - a.score).slice(0,10);
    
    const [showTable, setShowTable] = useState(false);

    if(contriloading){
        return <p className='text-sm p-2 text-gray-400'>
            Loading...
        </p>
    }
    return (
        
        <div className="w-full h-[450px] bg-[#13131a] border border-[#ffffff10] rounded-xl p-6 h-[450px]">
            
            <div className='flex flex-row justify-between'>
                <h2 className="text-xl font-semibold mb-4">
                {showTable? "All Contributors" : "Leaderboard"}
                </h2>
                <button
                    className='cursor-pointer py-2 px-4 rounded text-xs bg-gray-800 font-semibold hover:bg-gray-900'
                    onClick={() => {setShowTable(!showTable)}}>
                    {showTable? "Show Leaderboard" : "Show Submissions"}    
                </button>
            </div>

            {showTable? <ContributorsTable/> : 
            <ResponsiveContainer width="100%" height="100%">

                <BarChart
                data={topContri}
                layout="vertical"
                margin={{
                    top: 20,
                    right: 30,
                    left: 40,
                    bottom: 20,
                }}
                >

                <CartesianGrid strokeDasharray="3 3" />

                <XAxis type="number"
                domain={[40, 100]}
                        tick={{ fill: '#64748b', fontSize: 12 }}
                 />

                <YAxis
                    type="category"
                    dataKey="name"
                    width={100}
                        tick={{ fill: '#64748b', fontSize: 12 }}

                />

                <Tooltip
                cursor={{
                    fill: 'rgba(255,255,255,0.04)'
                }} 
                contentStyle={{ 
                    backgroundColor: '#13131a', 
                    border: '1px solid #ffffff15',
                    borderRadius: '8px',
                    color: '#13131a'
                }}
                labelStyle={{ color: '#64748b' }}/>

                <Bar
                    dataKey="score"
                    fill="#6366f1"
                    radius={[0, 4, 4, 0]}
                />

                </BarChart>

            </ResponsiveContainer>
        }
      </div>
    );
};

export default LeaderboardChart;