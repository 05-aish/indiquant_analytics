import React from 'react';
import { useSubmissions } from '../hooks/useSubmissions';
import { useContributors } from '../hooks/useContributors';

const ContributorsTable = ({contri, subs}) => {

    const submissionMap = new Map(
      subs.map((sub) => [sub.contributor_id, sub])  
    );

    const leaderBoard = contri.map((contributor) => {
        return {
            ...contributor,
            status: submissionMap.get(contributor.id)?.status || 'No Submission'
        };
    });

    const getStatusStyle = (status) => {
        switch(status) {
            case 'shortlisted': return 'text-emerald-400'
            case 'evaluated': return 'text-blue-400'
            case 'pending': return 'text-yellow-400'
            case 'rejected': return 'text-red-400'
            default: return 'text-slate-400'
        }
    }


    return (
        <div className='mt-4 overflow-y-auto max-h-[350px] custom-scrollbar'>
            <table className='w-full'>
                <thead>
                    <tr>
                        <th className='py-2 uppercase text-gray-500 text-sm sticky top-0 bg-[#0f0f14] '>Rank</th> 
                        <th className='py-2 uppercase text-gray-500 text-sm sticky top-0 bg-[#0f0f14]'>Name</th>
                        <th className='py-2 uppercase text-gray-500 text-sm sticky top-0 bg-[#0f0f14]'>Domain</th>
                        <th className='py-2 uppercase text-gray-500 text-sm sticky top-0 bg-[#0f0f14]'>College</th>
                        <th className='py-2 uppercase text-gray-500 text-sm sticky top-0 bg-[#0f0f14]'>Score</th>
                        <th className='py-2 uppercase text-gray-500 text-sm sticky top-0 bg-[#0f0f14]'>Status</th>
                    </tr>
                </thead>

                <tbody>
                    {leaderBoard.map((user, index) => (
                        <tr key={user.id}
                            className={
                                index % 2 === 0
                                    ? "bg-[#13131a]"
                                    : "bg-[#0a0a0f]"
                            }
                        >
                        
                            <td className='px-4 py-2'>{user.rank || '—'}</td>
                            <td className='text-center px-4 py-2 whitespace-nowrap'>{user.name}</td>
                            <td className='text-center px-4 py-2'>{user.domain}</td>
                            <td className='text-center px-4 py-2'>{user.college}</td>
                            <td className='text-center px-4 py-2'>{user.score}</td>
                            <td className={`text-center px-4 py-2 ${getStatusStyle(user.status)}`}>{user.status}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
    };

export default ContributorsTable;