const supabase = require('../config/supabase');

const { calculateScores, calculateEvaluationScore } = require('../utils/scoring');

async function createSubmission(req, res) {
    try{
        //get valid data from middleware
        const { contributor_id, project_title, domain } = req.validatedData;

        //get scores
        const scores = calculateScores();
        const evaluation_score = calculateEvaluationScore(scores);

        //db record
        const subRecord = {
            contributor_id,
            project_title,
            domain,
            evaluation_score,
            status: 'pending',
            ...scores
        };

        //insert to supabase
        const { data, error } = await supabase
            .from('submissions')
            .insert([subRecord])
            .select()
            .single();
        
        if(error) {
            console.log('Supabase error: ', error);
            return res.status(500).json({
                error: 'Database insertion failed',
                message: error.message
            });
        }

        //return success
        res.status(201).json({
            success: true,
            message: 'Submission recieved and scored',
            data: {
                id: data.id,
                project_title: data.project_title,
                evaluation_score: data.evaluation_score,
                status: data.status,
                submitted_at: data.submitted_at
            }
        });

    }
    catch (error) {
        console.error('Server error:', error);
        res.status(500).json({ error: 'Internal server error' });    
    }
}

module.exports = { createSubmission };