import express from 'express';
import jwt from 'jsonwebtoken';

export default function checkAuth(req: express.Request, res: express.Response, next: express.NextFunction) {
    const { cookies: { backend_login_token }} = req;
    
    if(!backend_login_token){
        return res.status(403).json({
            error: "No auth token found"
        })
    }

    const tokenSecret = process.env.SECRET || '';
    
    try {
        const isTokenValid = jwt.verify(backend_login_token, tokenSecret);
        
        if(isTokenValid){
            next();
        }
    }
    catch(e){
        const jwtError = (e as any)?.message;
        
        return res.status(403).json({
            error: jwtError ? jwtError : e
        });
    }
}