import express from 'express'
import TicketModel from '../models/TicketModel.js';

export const getMyTicket = async(req,res) => {
    try {

        const userId = req.user.id;
        const ticket =  await TicketModel.find({user : userId})
        .sort({createdAt : -1})// in recently booked appear on top . (decreasing order)
        res.json ({
            counts : ticket.length , 
            ticket
        })
    } catch (error) {
        return res.status(500).json({message : "History is unavailable , Take a break !"})
    }
} 