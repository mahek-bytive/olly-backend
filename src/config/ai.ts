import dotenv from 'dotenv';

dotenv.config({
  path: `./.env.${process.env.NODE_ENV}`,
});

export const CHAT_GPT = {
  URL: process.env.CHAT_GPT_URL ?? '',
  MODEL: process.env.CHAT_GPT_MODEL ?? '',
  TEMPERATURE: Number(process.env.CHAT_GPT_TEMPERATURE) ?? 0.1,
  API_KEY: process.env.CHAT_GPT_API_KEY ?? '',
};

export const PSEUDO = {};
