import jwt from 'jsonwebtoken';

export const createToken = (userId: number) => {
    const expiresIn = 60 * 60;
    const secretKey = process.env.JWT_SECRET as string;
    const payload = {
        userId
    }
    return jwt.sign(payload, secretKey, { expiresIn })
}