import React from 'react';
import { useContributors } from '../hooks/useContributors';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const DomainChart = ({ contri }) => {

    const getColor = (index, total) => 
    `hsl(${180 + (index * 120) / total}, 70%, 60%)` 
  
    if (!contri || contri.length === 0) return <div className="text-slate-500 text-sm">Loading...</div>
    const groupedDomainCount = contri.reduce((domainCount, log) => {
        if (!log.domain) return domainCount;
        const domain = log.domain;
        const existingDomain = domainCount.find(item => item.domain === domain);
        if (existingDomain) {
            existingDomain.count += 1;
        } else {
            domainCount.push({ domain, count: 1 });
        }
        return domainCount;
    }, []);
   
    return (
        <div className="w-full h-[350px] bg-[#13131a] border border-[#ffffff10] rounded-xl p-6 flex flex-col h-[450px]">
            
            <h2 className="text-xl font-semibold mb-4 text-white">
                 Contribution Domains
            </h2>
            

            <div className="flex flex-row items-center justify-between h-full w-full">
                
  
                <div className="w-1/2 h-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={groupedDomainCount}
                                dataKey="count"
                                nameKey="domain"
                                innerRadius="70%"
                                outerRadius="90%"
                                cornerRadius={10}
                                stroke="none" 
                                paddingAngle={8}
                               

                            >
                                {groupedDomainCount.map((entry, index) => (
                                    <Cell key={index} fill={getColor(index, groupedDomainCount.length)} />
                                ))}
                            </Pie>
                            <Tooltip 
                                contentStyle={{ backgroundColor: '#1c1c24', border: 'none', borderRadius: '8px' }}
                                itemStyle={{ color: '#fff' }}
                            />
                        </PieChart>
                    </ResponsiveContainer>
                </div>

                
                <div className="w-1/2 flex flex-col justify-center pl-4">
                    {groupedDomainCount.map((entry, index) => (
                        <div key={index} className="flex items-center mb-2">
                            <div 
                                className="w-3 h-3 rounded-sm mr-2" 
                                style={{ backgroundColor: getColor(index, groupedDomainCount.length)}}
                            />
                            <span className="text-xs text-[#94a3b8] whitespace-nowrap">
                                {entry.domain}
                            </span>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
}

export default DomainChart;