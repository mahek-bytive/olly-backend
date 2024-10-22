import HttpService from './httpServices';
import { CHAT_GPT } from '../config/ai';
import { logError } from './logger';

class ChatGPTService {
  private URL: string;

  private MODEL: string;

  private TEMPERATURE: number;

  private CONFIG: {
    headers: {
      Authorization: string
      'Content-Type': string
    }
  };

  constructor() {
    this.URL = CHAT_GPT.URL;
    this.MODEL = CHAT_GPT.MODEL;
    this.TEMPERATURE = CHAT_GPT.TEMPERATURE;
    this.CONFIG = {
      headers: {
        Authorization: `Bearer ${CHAT_GPT.API_KEY}`,
        'Content-Type': 'application/json',
      },
    };
  }

  public async chatGPT(messageArray: any): Promise<any> {
    try {
      const { data } = await HttpService.axiosPost(
        this.URL,
        {
          model: this.MODEL,
          messages: messageArray,
          temperature: this.TEMPERATURE,
        },
        this.CONFIG,
      );
      return data;
    } catch (error) {
      const errorMesage = error instanceof Error ? error.message : 'Unknown error';
      logError(`Error in Chatgpt : ${errorMesage}`);
      return null;
    }
  }
}

export default new ChatGPTService();
