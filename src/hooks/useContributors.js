import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export function useContributors(){
    const [contri, setContri] = useState([]);
    const [contriloading, setContriLoading] = useState(true);

    const fetchContributors = async () => {
            setContriLoading(true);
            const { data, error } = await supabase
                .from('contributors')
                .select('*');
            if (error) {
                console.error('Error fetching contributors:', error);
            } else {
                setContri(data);
            }
            setContriLoading(false);
        }

    useEffect(() => {
        fetchContributors();

    },[]);

    return { contri, contriloading, refetch: fetchContributors };
}