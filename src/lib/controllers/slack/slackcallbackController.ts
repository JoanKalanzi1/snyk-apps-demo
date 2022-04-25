import type { Controller } from '../../types';
import type { NextFunction, Request, Response } from 'express';
import { Router } from 'express';
import  fetchAccessToken  from '../slack/codeexchangeHandler'
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
       res.json(response.body)
      console.log( response)
     
    } catch (error) {
      return next(error);
    }
  }



 
    
  
}

