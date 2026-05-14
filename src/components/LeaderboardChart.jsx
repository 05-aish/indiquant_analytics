import React from 'react';
import { useContributors } from '../hooks/useContributors';
import { BarChart,  Bar,  XAxis,  YAxis,  Tooltip, ResponsiveContainer,  CartesianGrid } from 'recharts';


const LeaderboardChart = () => {
    const { contri, contriloading } = useContributors();
    const topContri = contri.sort((a, b) => b.score - a.score).slice(0,10);
    console.log(topContri);

    return (
        <div className="w-full h-[450px] bg-[#13131a] border border-[#ffffff10] rounded-xl p-6 h-[450px]">

            <h2 className="text-xl font-semibold mb-4">
            Leaderboard
            </h2>

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
                contentStyle={{ 
                    backgroundColor: '#13131a', 
                    border: '1px solid #ffffff15',
                    borderRadius: '8px',
                    color: '#e2e8f0'
                }}
                labelStyle={{ color: '#64748b' }}/>

                <Bar
                    dataKey="score"
                    fill="#6366f1"
                    radius={[0, 4, 4, 0]}
                />

                </BarChart>

            </ResponsiveContainer>
      </div>
    );
};

export default LeaderboardChart;