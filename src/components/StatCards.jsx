import React from 'react';
import { useState } from 'react';
import { useContributors } from '../hooks/useContributors';
import { useSubmissions } from '../hooks/useSubmissions';
import { useMetrics } from '../hooks/useMetrics';
import { useActivityLog } from '../hooks/useActivityLog';

const StatCards = ({onOpen, contri, subs}) => {
  

  const avgScore = (subs.reduce((sum, sub) => {
    return sum + sub.evaluation_score
  }, 0) / subs.length).toFixed(2);

  const shortlistedCount = subs.filter(subs => 
    subs.status === "shortlisted"
  ).length;

  return (
    <div className='grid grid-cols-5 gap-x-4 '>
        <div className="bg-[#13131a] border border-[#ffffff10] border-t-1 border-t-blue-300 rounded-xl p-6 flex flex-col justify-around hover:shadow-[0_0_20px_rgba(99,102,241,0.3)]">
            <span className='text-xs text-blue-200 tracking-widest mb-2'>TOTAL CONTRIBUTORS</span>
            <span className='text-4xl brightness-110 font-semibold'>{contri.length}</span>
        </div>

        <div className="bg-[#13131a] border border-[#ffffff10] rounded-xl p-6 flex flex-col justify-around border-t-blue-100 hover:shadow-[0_0_20px_rgba(99,102,241,0.3)]">
            <span className='text-xs text-blue-200 tracking-widest mb-2'>TOTAL SUBMISSIONS</span>
            <span className='text-4xl brightness-110 font-semibold'>{subs.length}</span>
        </div>
        
        <div className="bg-[#13131a] border border-[#ffffff10] rounded-xl p-6 flex flex-col justify-around border-t-blue-100 hover:shadow-[0_0_20px_rgba(99,102,241,0.3)]">
            <span className='text-xs text-blue-200 tracking-widest mb-2'>AVERAGE SCORE</span>
            <span  className='text-4xl brightness-110 font-semibold'>{avgScore}</span>
        </div>

        <div className="bg-[#13131a] border border-[#ffffff10] rounded-xl p-6 flex flex-col justify-around border-t-blue-100 hover:shadow-[0_0_20px_rgba(99,102,241,0.3)]">
            <span className='text-xs text-blue-200 tracking-widest mb-2'>SHORTLISTED COUNT</span>
            <span className='text-4xl brightness-110 font-semibold'>{shortlistedCount}</span>
        </div>

        <div className="bg-[#13131a] border border-[#6366f1] rounded-xl p-6 flex flex-col items-center justify-center cursor-pointer hover:bg-[#1a1a2e] transition-all duration-200 "
        onClick={onOpen}>
            <div className="text-4xl mb-2">+</div>
            <span className='text-xs text-blue-200 tracking-widest mb-2'>NEW SUBMISSION</span>
        </div>

    </div>
  )
}

export default StatCards;