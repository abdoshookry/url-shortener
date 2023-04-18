import { NextApiRequest, NextApiResponse } from "next";
import crypto from "crypto";

import connectMongo from "@/utils/connectMongo";
import Url from "@/models/url";

function generateUniqueId() {
  const bytes = crypto.randomBytes(3);
  const id = bytes.toString("base64").slice(0, 5);

  return id;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === "POST") {
      await connectMongo();
      const id = generateUniqueId();

      const url = new Url({
        originalUrl: req.body.originalUrl,
        shortUrl: id,
        // clicks: 0,
      });

      await url.save();

      res.status(201).json({ url: url });
    }
  } catch (error) {
    console.log(error);

    res.status(400).json({ error });
  }
}

// `mongodb+srv://${this.configService.get<string>(
//         'dbUser',
//       )}:${this.configService.get<number>(
//         'dbPassword',
//       )}@${this.configService.get<string>(
//         'dbUri',
//       )}/${this.configService.get<string>('dbOptions')}`

// mongodb+srv://test:<password>@ecommerce.5kk6dp1.mongodb.net/?retryWrites=true&w=majority
