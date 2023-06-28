import * as puppeteer from "puppeteer";
import { Playlist } from "../models/playlist";

export interface TrackInfo {
    name: string
}


async function importPlaylist(id: number): Promise<TrackInfo[]> {
    try {
        const playlist = await Playlist.findByPk(id);
        const browser = await puppeteer.launch({args: ["--headless=new"]})
        const page = await browser.newPage()

        await page.goto(`${playlist?.url}`)

        const title = await page.title();

        const trackList: TrackInfo[] = await page.evaluate(() => {
            const trackList = Array.from(document.getElementsByClassName("songs-list-row__song-name svelte-17mxcgw"))
            return trackList.map(track => ({
                name: track.innerHTML
            }))
        });

        const picture = await page.evaluate(()=>{
            const picture = Array.from(document.getElementsByClassName("svelte-yxysdi"))
            return picture.map(image=>({
                src: image.getAttribute("srcset")
            }))
        })

        const description = await page.evaluate(()=>{
            const description = Array.from(document.getElementsByClassName("content svelte-uhn6rl"))
            return description.map(text=>({
                content: text.innerHTML
            }))
        })

        await browser.close()

        Playlist.update(
            {
                picUrl: picture[2].src?.split(" ")[0],
                name: title.split("by")[0],
                description: description[0]?.content || null
            },
            {
                where: {
                    id: id
                }
            }
        )

        return trackList

    } catch (error) {
        console.error(error)
        return []
    }
}

export {importPlaylist}