const promptService = require('../services/promptService');

const processPrompt = async (req, res) => {
    try {
        const { prompt, decision } = req.body;
        
        if (!prompt) {
            return res.status(400).json({ 
                error: 'Prompt is required',
                requiresDecision: false
            });
        }

        if (!decision) {
            return res.json(
                promptService.requiresDecision(prompt)
                    ? await promptService.handleDecisionRequest(prompt)
                    : await promptService.handleConversation(prompt)
            );
        }

        if (!promptService.isValidDecision(decision)) {
            return res.status(400).json({
                error: `Invalid decision. Supported decisions are: ${promptService.AVAILABLE_DECISIONS.join(', ')}`,
                requiresDecision: true
            });
        }

        const promptData = {
            prompt,
            timestamp: new Date().toISOString()
        };

        const response = await promptService.processDecision(decision, promptData);
        res.json(response);

    } catch (error) {
        console.error('Error processing request:', error);
        res.status(500).json({ 
            error: 'Error processing your request',
            details: error.message,
            requiresDecision: false
        });
    }
};

module.exports = {
    processPrompt
};
