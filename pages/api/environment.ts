import type { NextApiRequest, NextApiResponse } from "next"
import { getAPIUrl, getDataHandlerEmail } from "../../lib/environment"
import { GifboxEnvironment } from "../../lib/types"

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<GifboxEnvironment>
) {
    res.status(200).json({
        apiUrl: getAPIUrl(),
        dataHandlerEmail: getDataHandlerEmail(),
    })
}
