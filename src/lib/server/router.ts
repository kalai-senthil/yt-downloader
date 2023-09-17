import { z } from 'zod'
import { publicProcedure, router } from './context'
import ytdl from 'ytdl-core'
export const appRouter = router({
    getVideoInfo: publicProcedure
        .input(
            z.object({
                url: z.string()
            })
        )
        .query(async ({ ctx, input }) => {
            const url = input.url;
            const info = await ytdl.getInfo(url, {

            })
            return info;
        })
})

export type AppRouter = typeof appRouter