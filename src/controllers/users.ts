import express from "express";
import prisma from "../config/prisma";

const getUsersController = async (_: express.Request, res: express.Response) => {
    try {
        const users = await prisma.user.findMany();
        return res.status(200).json({ data: users })
    }
    catch(e) {
        return res.status(500).json({
            error: e
        })
    }
};

export default {
    getUsersController
}