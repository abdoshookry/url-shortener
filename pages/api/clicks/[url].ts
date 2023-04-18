import Url from "@/models/url";
import connectMongo from "@/utils/connectMongo";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === "GET") {
      await connectMongo();

      const url = await Url.findOne({ shortUrl: req.query.url }).exec();

      res.status(200).json(url);
    }
  } catch (error) {
    res.status(422).json({ error });
  }
}
