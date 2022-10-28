import axios from "axios"

export default async (req, res) => {
  const response = await axios.get(
    "https://api.collegefootballdata.com/scoreboard",
    {
      headers: {
        Authorization: `Bearer ${process.env.CFBD_KEY}`,
      },
    }
  )
  res.status(200).json(response.data)
}
