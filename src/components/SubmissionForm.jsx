import React from 'react';
import {useState} from 'react';

const SubmissionForm = ({ onClose, refetchContri, refetchSubs }) => {
    const [name, setName] = useState('');
    const [college, setCollege] = useState('');
    const [project_title, setProject] = useState('');
    const [domain, setDomain] = useState('');

    const [error, setError] = useState('')

    const handleSubmit = async () => {
       
        console.log('submitted', { name, college, domain, project_title })
        const response = await fetch('http://localhost:3001/api/submissions', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, college, domain, project_title })
        });
        
        const data = await response.json();
        
        if (data.success) {
            console.log('refetching..')
            refetchContri();
            refetchSubs();
            onClose();

        } else {
                setError(data.message || 'Something went wrong');
        }
    }

    return (
         <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">

            <div className="bg-[#13131a] border border-[#ffffff10] rounded-xl p-8 w-full max-w-md">

                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-lg tracking-widest text-[#6366f1]/100 font-semibold uppercase ">New Submission</h2>
                    <button onClick={onClose} className='cursor-pointer'>✕</button>
                </div>

                <form>

                    <div className='flex flex-col'>
                    <label className='text-gray-400 uppercase font-semibold text-sm'>Name
                    <input type="text"
                            className="w-full bg-[#0a0a0f] border border-[#ffffff15] rounded-lg px-4 py-2 text-white text-sm mt-1 mb-4 outline-none focus:border-indigo-500"
                            value={name}
                            onChange={(e) => setName(e.target.value)} />
                    </label>
                    </div>

                    <div className='flex flex-col'>
                    <label className='text-gray-400 uppercase font-semibold text-sm'>College
                    <input type="text"
                            className="w-full bg-[#0a0a0f] border border-[#ffffff15] rounded-lg px-4 py-2 text-white text-sm mt-1 mb-4 outline-none focus:border-indigo-500"
                            value={college}
                            onChange={(e) => setCollege(e.target.value)} />
                    </label>
                    </div>

                    <div className='flex flex-col'>
                    <label className='text-gray-400 uppercase font-semibold text-sm'>Domain
                        <select
                                className="appearance-none w-full bg-[#0a0a0f] border border-[#ffffff15] rounded-lg px-4 py-2 text-white text-sm mt-1 mb-4 outline-none focus:border-indigo-500"
                                value={domain}
                                onChange={(e) => setDomain(e.target.value)}>
                                    <option value="">Select Domain</option>
                                    <option value="Full Stack">Full Stack</option>
                                    <option value="Quant Research">Quant Research</option>
                                    <option value="Platforms Engineer">Platforms Engineer</option>
                                    <option value="Finance">Finance</option>
                                    <option value="Machine Learning">Machine Learning</option>
                                    <option value="Data Science">Data Science</option>
                                    <option value="DevOps">DevOps</option>
                                    <option value="Blockchain">Blockchain</option>
                        </select>
                    </label>
                    </div>

                    <div className='flex flex-col'>
                    <label className='text-gray-400 uppercase font-semibold text-sm'>Project Title 
                    <input type="text"
                            className="w-full bg-[#0a0a0f] border border-[#ffffff15] rounded-lg px-4 py-2 text-white text-sm mt-1 mb-4 outline-none focus:border-indigo-500"
                            value={project_title}
                            onChange={(e) => setProject(e.target.value)} />
                    </label>
                    </div>

                    <button className=' px-4 py-2 font-semibold bg-[#6366f1]/50 hover:bg-[#6366f1]/40  rounded cursor-pointer'
                        type='button'
                        onClick={handleSubmit}>
                        Submit
                    </button>

                    {error && <p className="text-red-400 text-sm mt-2">{error}</p>}
                </form>
            </div>
        </div>
    );
};

export default SubmissionForm;