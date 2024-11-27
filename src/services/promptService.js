const AVAILABLE_DECISIONS = ['submit', 'yes', 'no'];
const DECISION_KEYWORDS = ['approve', 'confirm', 'proceed', 'agree', 'accept', 'fill', 'fill up'];

const createResponse = (type, message, data = {}, needsDecision = false) => ({
    type,
    message,
    ...data,
    timestamp: new Date().toISOString(),
    requiresDecision: needsDecision
});

const requiresDecision = (prompt) => {
    return DECISION_KEYWORDS.some(keyword => prompt.toLowerCase().includes(keyword));
};

const handleConversation = async (prompt) => {
    return createResponse(
        'conversation',
        'This is a normal conversation response',
        { prompt },
        false
    );
};

const handleDecisionRequest = async (prompt) => {
    const sampleData = {
        prompt,
        availableDecisions: AVAILABLE_DECISIONS,
        additionalInfo: "Here's the information you need to make a decision"
    };

    return createResponse(
        'decision',
        'This action requires your confirmation',
        sampleData,
        true
    );
};

const handleSubmit = async (promptData) => {
    return createResponse(
        'success',
        'Data submitted successfully',
        { data: promptData },
        false
    );
};

const handleYes = async (promptData) => {
    return createResponse(
        'approved',
        'Request approved',
        { data: promptData },
        false
    );
};

const handleNo = async (promptData) => {
    return createResponse(
        'rejected',
        'Request rejected',
        { data: promptData },
        false
    );
};

const processDecision = async (decision, promptData) => {
    switch (decision.toLowerCase()) {
        case 'submit':
            return handleSubmit(promptData);
        case 'yes':
            return handleYes(promptData);
        case 'no':
            return handleNo(promptData);
        default:
            throw new Error(`Invalid decision: ${decision}`);
    }
};

const isValidDecision = (decision) => {
    return AVAILABLE_DECISIONS.includes(decision.toLowerCase());
};

module.exports = {
    requiresDecision,
    handleConversation,
    handleDecisionRequest,
    processDecision,
    isValidDecision,
    AVAILABLE_DECISIONS
};
