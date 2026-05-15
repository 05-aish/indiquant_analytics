import React from 'react';
import { useActivityLog } from '../hooks/useActivityLog';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

const EngagementChart = () => {
  
    const { activity, activityloading } = useActivityLog();  
    const groupedData = activity.reduce((acc, log) => {
        if (!log.timestamp) return acc;

        const date = log.timestamp.split('T')[0];

        const existingDate = acc.find(item => item.date === date);

        if (existingDate) {
        existingDate.count += 1;
        }else {
            acc.push({
            date,
            count: 1
            });
        }

        return acc;
        }, 
    []);
    groupedData.sort((a, b) => new Date(a.date) - new Date(b.date));
    
   if (activityloading) return <div className="text-slate-500 text-sm">Loading...</div>

    return (
        <div className="w-full h-[350px] bg-[#13131a] border border-[#ffffff10] rounded-xl p-6">
            <h2 className="text-xl font-semibold mb-4">
                Engagement Activity
            </h2>

            <ResponsiveContainer width="100%" height="100%">
                <LineChart
                data={groupedData}
                margin={{
                    top: 20,
                    right: 30,
                    left: 10,
                    bottom: 20,
                }}
                >
                <CartesianGrid strokeDasharray="3 3" />

                <XAxis
                    dataKey="date"
                    tick={{ fill: '#64748b', fontSize: 12 }}
                    
                    tickFormatter={(value) =>
                    new Date(value).toLocaleDateString(
                        'en-US',
                        {
                        month: 'short',
                        day: 'numeric'
                        }
                    )
                    }
                />

                <YAxis
                    tick={{ fill: '#64748b', fontSize: 12 }}
                />

                <Tooltip
                    contentStyle={{ 
                    backgroundColor: '#13131a', 
                    border: '1px solid #ffffff15',
                    borderRadius: '8px',
                    color: '#e2e8f0'
                }} />

                <Line
                    type="monotone"
                    dataKey="count"
                    stroke="#6366f1"
                    strokeWidth={1}
                    dot={{ r: 4 }}
                />
                </LineChart>
            </ResponsiveContainer>
        </div>

    );
};

export default EngagementChart;