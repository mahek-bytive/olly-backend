export const commentCreatePrompt = (
  userMessage: string,
  competitionType: string,
  userName: string,
) => {
  const date = new Date().toISOString();
  let userVoteMessage = 'Pose a question asking the audience who they think will win as a third person.';
  if (competitionType === 'Self Challenge') {
    userVoteMessage = `Pose a yes or no question asking the audience if they think ${userName} will succeed in this competition as a third person.`;
  }
  const prompt = "welcome"

  const messageArray = [
    {
      role: 'system',
      content: `${prompt}`,
    },
    {
      role: 'user',
      content: `${userMessage}`,
    },
    {
      role: 'system',
      content: 'If user prompt contains illegal activity according to law do not display and just send a message "The prompt contains illegal activity. Please provide a different prompt for creating a competition". If the prompt is not clear, do not display and just send a message " Please provide more information or a specific prompt related to creating a competition.", If the prompt is clear, provide the JSON string as a response.',
    },
  ];
  return messageArray;
};

export const pseudo = {};
