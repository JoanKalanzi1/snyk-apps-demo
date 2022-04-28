import type { Controller } from '../../types';
import type { NextFunction, Request, Response } from 'express';
import { Router } from 'express';
import  fetchAccessToken  from './slackOAuthHandler'
import { updateUserDatabase } from './updatebase';

export class slackcallbackController implements Controller {

  public path = '/slackcallback';
  public router = Router();
  constructor() {
    this.initRoutes();
  }
  public initRoutes() {
    // The route to render all user projects lists
    this.router.get(`${this.path}`, this.getCode);

  }

  /**
   
   * @returns 
   */
  public async getCode(req: Request, res: Response, next: NextFunction) {
    try {
      const response = await fetchAccessToken(req.query.code as string)
        await updateUserDatabase(response.data)
      return res.render('sucessOAuth',{
        response
      })
     
    } catch (error) {
      console.error(error);

    }
  }



 
    
  
}

