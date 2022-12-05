import path from "path";
import fs from "fs";
import { type NextApiRequest, type NextApiResponse } from "next";

import { Tournament } from "../../../../interfaces";

export type ResponseData = {
    tournament: Tournament;
};

type ResponseError = {
    message: string;
};

const handler = async (req: NextApiRequest, res: NextApiResponse<ResponseData | ResponseError>) => {
    const { slug } = req.query;

    const jsonDirectory = path.join(process.cwd(), "data");
    const jsonData = fs.readFileSync(jsonDirectory + "/tournaments.json", "utf8");
    const tournaments = JSON.parse(jsonData) as Array<Tournament>;
    const tournament = tournaments.find((tournament: Tournament) => tournament.slug === slug);

    return tournament
        ? res.status(200).json({
            tournament
        })
        : res.status(404).json({
            message: "Not Found"
        });
};

export default handler;
