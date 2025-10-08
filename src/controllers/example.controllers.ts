import { Request, Response } from 'express';
import { AppError } from '../errors/AppError';

class ExampleController
{
    async helloWorld(req: Request, res: Response)
    {
        console.log('cid', req.headers.cid);
        return res.send('Hello Typescript');
    }

    testError(req: Request, res: Response)
    {
        try {
            throw new AppError('Erro padrão', 'APP_INFO', 401);
        } catch (err) {
            throw new AppError('Erro padrão 2', 'APP_INFO', 402, req.body, { cause: err as Error });
        }

        // throw new Error('Teste de erro.');
    }
}

export { ExampleController };
