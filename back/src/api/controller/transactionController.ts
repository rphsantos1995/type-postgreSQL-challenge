import { Router, Request, Response, NextFunction } from 'express';
import { transactionService } from '../service/transactionService';
import { userService } from '../service/userService';

export class transactionController {

  protected async getUserTransactions (req: Request, res: Response) {

    const { accountId } = req.body;
    const {data, code} = await transactionService.getUserTransactions(accountId);
    return res.status(code).json(data);

  }

  protected async getCreditedAccountId (req: Request, res: Response) {
   
    const {user} = req.params;
    const {data, code} = await transactionService.getCreditedAccountId(user);
    return res.status(code).json(data);
    
  }

  protected async createTransaction (req: Request, res: Response) {

    const { creditedId, debitedId, value } = req.body;
    const { data, code } = await transactionService.createTransaction(debitedId, creditedId, value); 
    return res.status(code).json(data);

  }

  protected async validateLogin (req: Request, res: Response, next: NextFunction) {

    const token = req.headers.authorization || '';
    const userId = await userService.getUserInfo(token);
    if (!userId) return res.status(401).json({ message: 'a valid token must be provided' });
    next();
  }

};

export class tscRouter extends transactionController {

  public router: Router;

  constructor() {

    super();
    this.router = Router();
    this.routes();

  }

  private routes(): void {

    this.router.get('/', super.getUserTransactions);
    this.router.get('/:user', super.validateLogin , super.getCreditedAccountId);
    this.router.post('/', super.validateLogin, super.createTransaction);

  }

}