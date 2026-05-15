function calculateScores(){
    //assigning random score
    const randomScore = () => {
        return Math.floor(Math.random() * 36) + 60;
    }

    return {
        documentation_score: randomScore(),
        execution_score: randomScore(),
        thinking_score: randomScore()
    };
}

function calculateEvaluationScore(scores) {
    //avg of  3 scores
    const { documentation_score, execution_score, thinking_score } = scores;

    return Math.round((documentation_score + execution_score + thinking_score ) / 3);
}

module.exports = { calculateScores, calculateEvaluationScore };