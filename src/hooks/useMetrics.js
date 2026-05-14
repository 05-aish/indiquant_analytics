import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export function useMetrics(){
    const [metrics, setMetrics] = useState([]);
    const [metricsloading, setMetricsLoading] = useState(true);

    useEffect(() => {
        async function fetchMetrics() {
            setMetricsLoading(true);
            const { data, error } = await supabase
                .from('daily_metrics')
                .select('*');
            if (error) {
                console.error('Error fetching metrics:', error);
            } else {
                setMetrics(data);
            }
            setMetricsLoading(false);
        }

        fetchMetrics();

    },[]);

    return { metrics, metricsloading };
}