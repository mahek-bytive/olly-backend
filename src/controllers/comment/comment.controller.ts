import { NextFunction, Request, Response } from 'express';
import { asyncHandler } from '../../utils/asyncHandler';
import { responseHandler, errorHandler } from '../../utils/responseHandler';
import chatgptServices from '../../utils/chatgpt.services';
import { commentCreatePrompt } from '../../../prompts/competition.prompts';

class CommentController {
  public generateComment = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    console.log('generating comment');
    const messageArray = ""
    const response = await chatgptServices.chatGPT(messageArray);
    console.log("chatgpt response:", response);
    responseHandler(response, res);
  });
}

export default new CommentController();