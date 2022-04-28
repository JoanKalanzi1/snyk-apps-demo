import type { Controller } from '../../types';
import type { NextFunction, Request, Response } from 'express';
import { Router } from 'express';
import { Issues } from './slackHandler';
import { fetchOrgNames } from '../getorg/orgsHandlers';
import { fetchIssueData } from "./getIssues/getIssueData";
/**
 * The ProjectsController class for handling user projects
 * page and related refecquests. Every controller class
 * implements the controller interface which
 * has two members the path and the router.
 */
export class SlackController implements Controller {
  // The base URL path for this controller
  public path = '/slack';
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
    this.router.get(`${this.path}`, this.postSlack);
    // this.router.get(`${this.path}`, this.ProjectNames);
  }

  /**
   * Gets the projects page from the Snyk API using the
   * user access token and then renders the project list
   * @returns Projects page with list of user project
   * otherwise error via next function for error
   * middleware to handle
   */
  private async postSlack(req: Request, res: Response, next: NextFunction) {
    try {
      // const names = await fetchOrgNames();
      // const webhook = await postToSlack(names);
      const postIssuesToSlack = await Issues();
      return res.render('slack', {
        postIssuesToSlack ,
      });
    } catch (error) {
      return next(error);
    }
  }

  // private async ProjectNames(req: Request, res: Response, next: NextFunction) {
  //   try {
  //     const webhook = await postProjectNames();
  //     return res.render('slack', {
  //       webhook,
  //     });
  //   } catch (error) {
  //     return next(error);
  //   }
  // }
}
// const getAllPosts = async (req, res) => {
//   try {
//     const posts = await models.Post.findAll({
//       include: [
//         {
//           model: models.Comment,
//           as: "comments"
//         },
//         {
//           model: models.User,
//           as: "author"
//         }
//       ]
//     });
//     return res.status(200).json({ posts });
//   } catch (error) {
//     return res.status(500).send(error.message);
//   }
// };