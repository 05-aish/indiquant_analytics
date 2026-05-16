import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

const GrowthChart = ({ metrics }) => {
  return (
    <div className="w-full h-[350px] bg-[#13131a] border border-[#ffffff10] rounded-xl p-6">
        <h2 className="text-lg tracking-wide font-semibold mb-4">
            Submission Activity
        </h2>

        <ResponsiveContainer width="100%" height="100%" >
            
             <LineChart
                data={metrics}
                margin={{
                    top: 20,
                    right: 30,
                    left: 10,
                    bottom: 20,
                }}>

                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border-3)" />

                <XAxis dataKey="date" 
                    stroke="var(--color-text-3)"
                    tick={{ fill: '#64748b', fontSize: 12 }}

                    tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric'
                })} />

                <YAxis domain={[0, 'dataMax']}
                        tickCount={6}
                        tick={{ fill: '#64748b', fontSize: 12 }}
                        stroke="var(--color-text-3)"/>

                <Tooltip
                contentStyle={{ 
                backgroundColor: '#13131a', 
                border: '1px solid #ffffff15',
                borderRadius: '8px',
                color: '#e2e8f0'
                }}
                labelStyle={{ color: '#64748b' }}/>

                <Line type="monotone" dataKey="total_contributors" stroke="#6366f1"
                strokeWidth={1}
                dot={{ r: 4 }}
                />

            </LineChart>
        </ResponsiveContainer>
    </div>
  );
}

export default GrowthChart;