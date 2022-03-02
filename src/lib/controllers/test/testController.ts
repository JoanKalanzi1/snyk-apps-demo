import type { Controller } from '../../types';
import type { NextFunction, Request, Response } from 'express';
import { Router } from 'express';


/**
 * The testController class for handling user test
 * page and related requests. Every controller class
 * implements the controller interface which
 * has two members the path and the router.
 */
export class testController implements Controller {
  // The base URL path for this controller
  // this is were the path is defined
  public path = '/test';
  // Express router for this controller
  public router = Router();

  /**
   * The constructor is used to initialize the
   * routes for this controller
   */
  constructor() {
    this.initRoutes();
  }

  private initRoutes() {
    // The route to render all user projects lists
    this.router.get(`${this.path}`, this.test);
  }

  /**
   * Gets the projects page from the Snyk API using the
   * user access token and then renders the project list
   * @returns Projects page with list of user project
   * otherwise error via next function for error
   * middleware to handle
   */
  private  test (req: Request, res: Response, next: NextFunction) {
    try {
      
    //   return res.json({hey : "this is my world"});
      return res.render('test')
    } catch (error) {
      return next(error);
    }
  }
}
