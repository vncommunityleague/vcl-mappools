import Head from "next/head";
import useSWR from "swr";
import { useRouter } from "next/router";
import { type NextPage } from "next";
import { useEffect, useState, type ChangeEvent } from "react";
import { TournamentBeatmap } from "../../interfaces";

const tableHeader: Array<string> = [ "Round", "Mod", "Beatmap", "Mapper", "ID", "SR", "BPM", "Length", "CS", "AR", "OD" ];

const fetcher = async (url: string) => {
    const res = await fetch(url);
    const data = await res.json();

    if (res.status !== 200) {
        throw new Error(data.message);
    }

    return data;
};

const Home: NextPage = () => {
    const [ currentTournament, setCurrentTournament ] = useState<string>("vhp4");
    const [ searchQuery, setSearchQuery ] = useState<string>("");

    const router = useRouter();

    const { slug } = router.query;
    const { data, error, mutate } = useSWR(() => slug && "/api/tournaments/" + slug, fetcher);

    const handleSearchInput = (event: ChangeEvent<HTMLInputElement>) => {
        const queryValue = event.target.value;
        const url: { [key: string]: any } = {
            pathname: router.pathname,
            query: {
                slug: currentTournament,
                query: queryValue
            }
        };

        setSearchQuery(event.target.value);

        mutate(fetcher("/api/tournaments/" + slug + "/search" + "?query=" + searchQuery), {
                rollbackOnError: false,
                populateCache: true,
                revalidate: false
            }
        ).then();

        if (queryValue === "") {
            delete url.query["query"];
        }

        router.replace(url).then().catch();
    };

    const handleSelectTournament = (event: ChangeEvent<HTMLSelectElement>) => {
        setCurrentTournament(event.target.value);
        router.push({
            pathname: router.pathname,
            query: {
                slug: event.target.value
            }
        })
            .then().catch();
    };

    return (
        <>
            <Head>
                {!data ? (
                    <title>{`Vietnam Community League Mappools`}</title>
                ) : (
                    <title>{`${data.tournament.name}${data.tournament.season || ""} Mappools | Vietnam Community League Mappools`}</title>
                )}
            </Head>
            <div className="mt-12">
                <div className="w-full mb-6">
                    {!data ? (
                        <h1 className="text-4xl font-semibold text-center uppercase">{`Mappools`}</h1>
                    ) : (
                        <h1 className="text-4xl font-semibold text-center uppercase">{`${data.tournament.name}${data.tournament.season || ""} Mappools`}</h1>
                    )}
                </div>
                <div className="flex items-center w-full mb-4">
                    <div className="w-full max-w-xl">
                        <input
                            className="w-full px-4 py-3 rounded-xl bg-[#1a1a1a] placeholder:text-[#7f7f7f]"
                            placeholder="type here to search..."
                            onChange={handleSearchInput}
                        />
                    </div>
                    <div className="ml-4">
                        <select
                            className="px-6 py-3 rounded-xl bg-[#1a1a1a]"
                            value={currentTournament}
                            onChange={handleSelectTournament}
                        >
                            <optgroup
                                label="VNOC"
                                className="not-italic"
                            >
                                <option value="vnoc2">Season 2</option>
                                <option value="vnoc3">Season 3</option>
                                <option value="vnoc4">Season 4</option>
                            </optgroup>
                            <optgroup
                                label="VHP"
                                className="not-italic"
                            >
                                <option value="vhp2">Season 2</option>
                                <option value="vhp3">Season 3</option>
                                <option value="vhp4">Season 4</option>
                            </optgroup>
                            <optgroup
                                label="o!NNT"
                                className="not-italic"
                            >
                                <option value="nnt2-a">Season 2 - A</option>
                                <option value="nnt2-b">Season 2 - B</option>
                                <option value="nnt3-a">Season 3 - A</option>
                                <option value="nnt3-b">Season 3 - B</option>
                                <option value="nnt4-a">Season 4 - A</option>
                                <option value="nnt4-b">Season 4 - B</option>
                            </optgroup>
                            <optgroup
                                label="Tryouts"
                                className="not-italic"
                            >
                                <option value="4wc2021">4WC 2021</option>
                                <option value="owc2021">OWC 2021</option>
                                <option value="owc2022">OWC 2022</option>
                            </optgroup>
                            <optgroup
                                label="Others"
                                className="not-italic"
                            >
                                <option value="vpt">VPT</option>
                                <option value="rddc">RDDC</option>
                            </optgroup>
                        </select>
                    </div>
                </div>
                <table className="w-full mx-auto select-text">
                    <thead>
                    <tr className="table-row bg-[#2e2e2e]">
                        {tableHeader.map((column) => {
                            return (
                                <th
                                    key={column}
                                    className="table-cell w-fit px-2 py-3"
                                >
                                    {column}
                                </th>
                            );
                        })}
                    </tr>
                    </thead>
                    <tbody>
                    {!data ? (
                        <tr className="odd:bg-[#1f1f1f] even:bg-[#161616]">
                            <td
                                className="px-2 py-2 text-center"
                                colSpan={tableHeader.length}
                            >
                                {!error ? (
                                    <div>
                                        loading...
                                    </div>
                                ) : (
                                    <div>
                                        failed to get tournament mappools from hoaq&#39;s loli basement
                                    </div>
                                )}
                            </td>
                        </tr>
                    ) : (
                        data.tournament.mappools?.map((beatmap: TournamentBeatmap) => {
                            return (
                                <tr
                                    key={beatmap.beatmap_id}
                                    className="odd:bg-[#1f1f1f] even:bg-[#161616]"
                                >
                                    <td className="table-cell px-2 py-2 text-center">
                                        <div>
                                            {beatmap.abbreviation}
                                        </div>
                                    </td>
                                    <td className="table-cell px-2 py-2.5 text-center">
                                        <div>
                                            {beatmap.pick}
                                        </div>
                                    </td>
                                    <td className="table-cell px-2 py-2.5 text-left truncate">
                                        <div>
                                            {`${beatmap.artist} - ${beatmap.title} [${beatmap.difficulty}]`}
                                        </div>
                                    </td>
                                    <td className="table-cell px-2 py-2.5 text-right">
                                        <div>
                                            {beatmap.mapper}
                                        </div>
                                    </td>
                                    <td className="table-cell px-2 py-2.5 text-center">
                                        <div>
                                            {beatmap.beatmap_id}
                                        </div>
                                    </td>
                                    <td className="table-cell px-2 py-2.5 text-center">
                                        <div>
                                            {Number(beatmap.star_rating).toFixed(2)}
                                        </div>
                                    </td>
                                    <td className="table-cell px-2 py-2.5 text-center">
                                        <div>
                                            {beatmap.bpm}
                                        </div>
                                    </td>
                                    <td className="table-cell px-2 py-2.5 text-center">
                                        <div>
                                            {beatmap.length}
                                        </div>
                                    </td>
                                    <td className="table-cell px-2 py-2.5 text-center">
                                        <div>
                                            {Number(beatmap.circle_size).toFixed(1)}
                                        </div>
                                    </td>
                                    <td className="table-cell px-2 py-2.5 text-center">
                                        <div>
                                            {Number(beatmap.approach_rate).toFixed(1)}
                                        </div>
                                    </td>
                                    <td className="table-cell px-2 py-2.5 text-center">
                                        <div>
                                            {Number(beatmap.overall_difficulty).toFixed(1)}
                                        </div>
                                    </td>
                                </tr>
                            );
                        }))}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default Home;
