import { Response } from 'express';
import Users from '../models/Users';
import { Request, Payload } from '../types';
import jwt from 'jsonwebtoken';

export const signin = async (req: Request, res: Response) => {
  try {
    const { accountId } = req.body;

    let user: any = await Users.findOne({ accountId });
    if (!user) {
      const newUser = new Users({ accountId });
      user = await newUser.save();
    }
    // else if (user.contracts !== contracts)
    //   await Users.updateOne({ accountId }, { contracts });

    const payload: Payload = {
      userId: user._id
    };

    jwt.sign(
      payload,
      process.env.JWTSECRET,
      { expiresIn: process.env.JWTEXPIRATION },
      async (err, token) => {
        if (err) throw err;
        return res.json({ token, user });
      }
    );

  } catch (err) {
    console.error(err);
    return res.status(400).json('Interanal server error');
  }

};

export const change = async (req: Request, res: Response) => {
  try {
    const { name, social, twitter } = req.body;
    const user = await Users.findByIdAndUpdate(req.userId, { name, social, twitter }, { new: true, runValidators: true },);
    return res.json(user);
  } catch (err) {
    console.error(err);
    return res.status(400).json('Interanal server error');
  }
};