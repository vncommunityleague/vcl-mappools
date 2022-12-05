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
    const { slug, query, sort } = req.query;
    const loweredCaseQuery = String(query).toLowerCase();

    const jsonDirectory = path.join(process.cwd(), "data");
    const jsonData = fs.readFileSync(jsonDirectory + "/tournaments.json", "utf8");
    const tournaments = JSON.parse(jsonData) as Array<Tournament>;
    const tournament = tournaments.find((tournament: Tournament) => tournament.slug === slug);

    if (!tournament) {
        return res.status(404).json({
            message: "Not Found"
        });
    }

    tournament.mappools = tournament.mappools.filter(beatmap => Object.values(beatmap).map(value => isNaN(value) ? value.toString().toLowerCase() : Number(value).toFixed(2)).some(value => value.indexOf(loweredCaseQuery) > -1));

    return res.status(200).json({
        tournament
    });

};

export default handler;
