const supabase = require('../config/supabase');
const { calculateScores, calculateEvaluationScore } = require('../utils/scoring');

async function createSubmission(req, res) {
    try {
        // get valid data from middleware
        const { name, college, project_title, domain } = req.validatedData;

        // calculate scores
        const scores = calculateScores();
        const evaluation_score = calculateEvaluationScore(scores);

        // step 1: insert contributor
        const { data: newContributor, error: contriError } = await supabase
            .from('contributors')
            .insert([{ name, college, domain }])
            .select()
            .single();

        if (contriError) {
            return res.status(500).json({
                error: 'Contributor insertion failed',
                message: contriError.message
            });
        }

        // step 2: insert submission using new contributor id
        const { data: newSubmission, error: subError } = await supabase
            .from('submissions')
            .insert([{
                contributor_id: newContributor.id,
                project_title,
                domain,
                evaluation_score,
                status: 'pending',
                ...scores
            }])
            .select()
            .single();
        

        if (subError) {
            return res.status(500).json({
                error: 'Submission insertion failed',
                message: subError.message
            });
        }
        
        await supabase
            .from('contributors')
            .update({ score: evaluation_score })
            .eq('id', newContributor.id);

        // step 3: log activity
        await supabase.from('activity_log').insert([{
            contributor_id: newContributor.id,
            action: 'submitted',
            domain: domain
        }]);

        // step 4: return success
        res.status(201).json({
            success: true,
            message: 'Submission received and scored',
            data: {
                id: newSubmission.id,
                project_title: newSubmission.project_title,
                evaluation_score: newSubmission.evaluation_score,
                status: newSubmission.status,
                submitted_at: newSubmission.submitted_at
            }
        });

    } catch (error) {
        console.error('Server error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

module.exports = { createSubmission };