import { Request } from 'express';
import { sign, SignOptions, verify } from 'jsonwebtoken';

export const getCurrentUser = (req: Request) => {
    let token = req.headers.authorization;
    if (!token) return null;
    token = token.split(' ').pop();
    if (!token) return null;
    const payload = verify(token!, process.env.SECRET_KEY_ACCESS_TOKEN!);
    if (!payload) return null;
    return payload;
}

export const generateToken = (payload: any, secretOrPrivateKey: string) => {
    const options: SignOptions = {

    }

    return sign(payload, secretOrPrivateKey, options);
}