// src/middleware/errorHandler.ts
import { Request, Response, NextFunction } from 'express';

const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  if (err.name === 'ValidationError') {
    return res.status(400).json({
      status: 'error',
      message: err.message,
      details: err.errors
    });
  }

  return res.status(500).json({
    status: 'error',
    message: 'Internal Server Error'
  });
};

export default errorHandler;
