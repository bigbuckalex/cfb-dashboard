import axios from "axios"
import moment from "moment"

export default async (req, res) => {
  const scoreboard = await axios.get(
    "https://api.collegefootballdata.com/scoreboard",
    {
      headers: {
        Authorization: `Bearer ${process.env.CFBD_KEY}`,
      },
    }
  )
  const teams = await axios.get(
    `https://api.collegefootballdata.com/teams?year=${moment().format("YYYY")}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.CFBD_KEY}`,
      },
    }
  )
  res.status(200).json([[...scoreboard.data], [...teams.data]])
}
