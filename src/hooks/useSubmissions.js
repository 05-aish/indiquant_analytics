import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export function useSubmissions(){
    const [subs, setSubs] = useState([]);
    const [subsloading, setSubsLoading] = useState(true);

    const fetchSubmissions = async () => {
            setSubsLoading(true);
            const { data, error } = await supabase
                .from('submissions')
                .select('*');
            if (error) {
                console.error('Error fetching submissions:', error);
            } else {
                setSubs(data);
            }
            setSubsLoading(false);
        }

    useEffect(() => {
        fetchSubmissions();

    },[]);

    return { subs, subsloading, refetch: fetchSubmissions };
}
