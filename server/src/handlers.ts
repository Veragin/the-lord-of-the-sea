import { Request, Response } from 'express';

export const infoHandler = (req: Request, res: Response) => {
    const { params } = req;
    const { name = 'World' } = params;
    const response = { name: 'Franta ' + name };

    return res.json(response);
};
