import axios from "axios"

export default async (req, res) => {
  const response = await axios.get(
    "https://api.collegefootballdata.com/scoreboard",
    {
      headers: {
        Authorization: `Bearer AukmEtd9b3FILPv7e+axpv2mN4l7QjUU0VKN5MWoS6UJ10suu57o8zCxdjcxqt7D`,
      },
    }
  )
  res.status(200).json({ data: response.data })
}
