// apps/backend/src/routes/payments.ts
import { Request, Response } from 'express';

const paymentsRoute = (req: Request, res: Response) => {
  res.send('Payments route OK');
};

export default paymentsRoute;