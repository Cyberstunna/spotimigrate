import { PlaylistTrack } from "../models/playlistTrack";
import { Track } from "../models/track";
import { TrackInfo } from "./importPlaylist";

async function preProcessImportsToSpotify(tracks: TrackInfo[], playlistId: number) {
    // Enter Each track into the db and associate with the playlist
    await Promise.all(tracks.map(async (track) => {
        const result = await Track.create({ name: track.name });
        await PlaylistTrack.create({
          playlistId: playlistId,
          trackId: result.id,
        });
        return result;
    }));
}

function processImportsToSpotify(id: number) {
    // Enter Each track into the db and associate with the playlist

    
}

export {preProcessImportsToSpotify, processImportsToSpotify}