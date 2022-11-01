import { NextApiRequest, NextApiResponse } from 'next';
import nextConnect from 'next-connect';

export type IBookr = {
  id: string;
  title: string;
  url: string;
};

const apiRoute = nextConnect<NextApiRequest, NextApiResponse>({
  attachParams: true,
  onError(error, req, res) {
    res
      .status(501)
      .json({ error: `Sorry something Happened! ${error.message}` });
  },
  onNoMatch(req, res) {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  },
});
