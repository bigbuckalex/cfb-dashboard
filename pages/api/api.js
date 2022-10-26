import axios from "axios"
import CFBD_KEY from "./key"

export default async (req, res) => {
  const response = await axios.get(
    "https://api.collegefootballdata.com/scoreboard",
    {
      headers: {
        Authorization: CFBD_KEY,
      },
    }
  )
  res.status(200).json(response.data)
}
