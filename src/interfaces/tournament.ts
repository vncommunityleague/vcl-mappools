export interface TournamentBeatmap {
    abbreviation: string,
    pick: string,
    beatmap_id: number,
    beatmapset_id: number,
    artist: string,
    title: string,
    mapper_id: number,
    mapper: string,
    difficulty: string,
    star_rating: number,
    bpm: number,
    length: string,
    circle_size: number,
    approach_rate: number,
    overall_difficulty: number
}

export interface Tournament {
    name: string,
    season?: number,
    slug: string,
    mappools: Array<TournamentBeatmap>
}
