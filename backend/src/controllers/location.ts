import { Response } from 'express';
import Locations from '../models/Locations';
import { Request } from '../types';

export const get = async (req: Request, res: Response) => {
    try {
        const locations = await Locations.find();
        return res.json(locations);
    } catch (err) {
        console.error(err);
        return res.status(400).json('Interanal server error');
    }
};

export const save = async (req: Request, res: Response) => {
    try {
        const { latitude, longitude } = req.body;
        const myLocation = await Locations.findOne({ user: req.userId });
        if (myLocation)
            await Locations.updateOne({ user: req.userId }, { latitude, longitude });
        else {
            const location = new Locations({ user: req.userId, latitude, longitude });
            await location.save();
        }
        return res.json("success");
    } catch (err) {
        console.error(err);
        return res.status(400).json('Interanal server error');
    }
};