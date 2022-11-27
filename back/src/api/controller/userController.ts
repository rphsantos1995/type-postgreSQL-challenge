
import { Router, Request, Response } from 'express';
import { userService } from '../service/userService';


export class userController {

  protected async getUsers (req: Request, res: Response) {

    const { code, data } = await userService.getUsers();
    return res.status(code).json(data);

  }

  protected async createUser (req: Request, res: Response) {

    const { username, password} = req.body;
    const { code, data } = await userService.createUser(username, password);
    return res.status(code).json(data);
    
  }

  protected async loginUser (req: Request, res: Response) {

    const { username, password} = req.body;
    const { code, data } = await userService.loginUser(username, password);
    return res.status(code).json(data);

  }

}

export class userRouter extends userController {

  public router: Router;

  constructor() {
    super();
    this.router = Router();
    this.routes();
  }

  private routes(): void {
    
    this.router.get('/', super.getUsers);
    this.router.post('/', super.createUser);
    this.router.post('/login', super.loginUser)

  }

}
