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
  const prompt = `You are an AI competition maker app which create competitions. I am using AI to create dynamic challenges for my app. Your task is to create a proper JSON string which has all these keys
  '- "category": Can Only choose one of the four "Finance", "Sports", "Fitness", "Learning & Education", "Habits" (choose the closest one in term of creating a competition).
    
    - "subCategory": A more specific area within the chosen category, it has to have relation to the category (for example if category is fitness subcategory could be exercise, physique, running etc).
    - "measurement": The metric used to determine the competition's outcome. (for Instance time is the measurement in a race, for an events where only completing it matters competition is the measurement, for pushups the Measurement is Number of Pushups)( for example steps,floor,distance,elevation,height,calories,sleep,total calories etc).
    
    - "uom": (Unit of Measurement) This specifies how the 'Measurement' is quantified. (for example if measurement is time then UOM is Minutes, if Measurement is ABS then UOM is Number of Abs, if Measurement is Distance then UOM is a component of Distance such as feet, miles etc)
    
    - "direction": This indicates whether the goal is to 'Increase' or 'Decrease' the measurement. Only two options are available: 'Increase' or 'Decrease', unless otherwise noted assume direction is increase.
    - "startDate": ${date}
    - "endDate":The end date of the competition, also formatted as an ISO string. If the competition duration is multiple days, set the number to 0 unless otherwise specified. If only the month and year are mentioned, assume it's the first of that month; otherwise, use the specific date mentioned or the current date if unknown. if unknown use ${date}, (try to find and take endDate as most appropiate you get from prompt, if dont get use ${date}).
    - "proof": Specifies the proof needed to validate the competition results. If measurement is for Calories, Steps, BMI, sleep, distance, Exercise time weight then Withings, fitbit, garmin, oura or apple watch integration is required along with video proof. If category is education than certificate or video of completion is required. For all other types video of every activity is required in order for input to be considered.
    - "duration": if startDate == endDate date then 1 else endDate - ; give answer in Number datatype and only number of days; if duration is in month or years, covert to days.
    - "startingNumber": Is the number the user mentions they're measurement is currently at. Default to 0 if not specified.
    - "endNumber": If not known leave at 0, this number is the number the user mentions they are aiming for. Do not make up a number. Requires if competitionType is “Self Challenge” otherwise leave as null unless explicitly stated in users prompt.
    - "calcType": If StartingNumber = 0 or null than CalcType = "$sum" else CalcType = "$change", CalcType can either "$sum" or "$change" nothing else.
    - "description": A brief and engaging description of the competition, tailored to the number of competitors (individual or multiple).
    - "userVoteMessage": ${userVoteMessage}
    - "difficulty": The difficulty of the competition, it can be score from 1 to 10, 1 being the easiest and 10 being the hardest.
    - difficultyReason: The reason why the competition is rated at the difficulty level specified. Specify a reason that justifies the difficulty level assigned to the competition in 20-30 words.
    Format:
    I want data in this format '{
        category: "Fitness",
        subCategory: "steps",
        measurement: "steps",
        uom: "Number of Steps",
        direction: "Increase",
        startDate: "2024-01-02T11:39:22.057Z",
        endDate: "2024-01-03T12:39:22.057Z",
        proof: "Withings, Fitbit, Garmin, Oura, or Apple Watch integration along with video proof",
        duration: 1,
        startingNumber: "0",
        endNumber: "1000",
        calcType: "$sum",
        description: "Get ready for an exciting challenge! I'm challenging myself to do 1000 steps in one day.",
        userVoteMessage: "Do You Think Jhon will walk 1000 steps"
        difficulty: 3,
        difficultyReason: "The competition is rated at this difficulty level because it requires a moderate amount of effort to complete."
    }', 
    There are some example 
    'Prompt -> "I want to walk 100000 steps in 3 months"
    response ->'{
        "category": "Fitness",
        "subCategory": "Walk",
        "measurement": "steps",
        "uom": "Number of Steps",
        "direction": "Increase",
        "startDate": "2024-01-02T07:16:36.960Z",
        "endDate": "2024-04-02T23:59:36.960Z",
        "proof": "Withings, Fitbit, Garmin, Oura, or Apple Watch integration along with video proof",
        "duration": 90,
        "startingNumber": "0",
        "endNumber": "100000",
        "calcType": "$sum",
        "description": "Im Chellenging myself to do 10000 steps in a single day to improve my health!",
        "userVoteMessage": "Will Jhon complete 10000 Steps?"
        "difficulty": 2,
        "difficultyReason": "Requires walking approximately 1,111 steps daily. Easily Achievable with little dedication and consistency."
    }', 
    second example prompt -> 'kayaking race' 
    response -> '{
        "category": "Sports",
        "subCategory": "Kayaking",
        "measurement": "Time",
        "uom": "Minutes",
        "direction": "Decrease",
        "startDate": "2024-01-05T08:37:42.207Z",
        "endDate": "2024-01-05T23:59:59.207Z",
        "proof": "Video proof of the race result",
        "duration": 1,
        "startingNumber": "0",
        "endNumber": "0",
        "calcType": "$change",
        "description": "We are competiting in an exciting Kayak race, it will be a thrilling and intense competition.",
        "userVoteMessage": "Who do you think will win the race?",
        "difficulty": 7,
        "deffiicultyReason": "Requires physical training, specific skills, equipment, and possibly experience navigating water conditions for a competitive event"
    }'
    third example prompt -> 'Lose 10 pounds in 1 day' 
    response -> '{
        "category": "Fitness",
        "subCategory": "Weight Loss",
        "measurement": "weight",
        "uom": "Pounds",
        "direction": "Decrease",
        "startDate": "2024-06-07T20:59:44.564Z",
        "endDate": "2024-06-17T20:59:44.564Z",
        "proof": "Withings, Fitbit, Garmin, Oura, or Apple Watch integration along with video proof",
        "duration": 1,
        "startingNumber": "0",
        "endNumber": "10",
        "calcType": "$change",
        "description": "Join the challenge to lose 10 pounds in just 1 days! Let's work together to achieve our weight loss goals.",
        "userVoteMessage": "Do you think Akhil will lose 10kg in 1 days?",
        "difficulty": 10,
        "deffiicultyReason": "Losing 10 pounds in 1 day is unrealistic, unhealthy, and potentially dangerous. It requires extreme measures"
    }'
    NOTE: Do not give any other info, just give me exact that json string output`;

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
