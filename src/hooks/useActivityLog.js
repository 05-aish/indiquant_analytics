import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export function useActivityLog(){
    const [activity, setActivity] = useState([]);
    const [activityloading, setActivityLoading] = useState(true);

    useEffect(() => {
        async function fetchActivity() {
            setActivityLoading(true);
            const { data, error } = await supabase
                .from('activity_log')
                .select('*');
            if (error) {
                console.error('Error fetching activity log:', error);
            } else {
                setActivity(data);
            }
            setActivityLoading(false);
        }

        fetchActivity();

    },[]);

    return { activity, activityloading };
}