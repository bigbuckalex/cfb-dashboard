import axios from "axios";
import moment from "moment";

export default async (req, res) => {
  const calendar = await axios.get(
    `https://api.collegefootballdata.com/calendar?year=${moment().format(
      "YYYY"
    )}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.CFBD_KEY}`,
      },
    }
  );
  const games = await axios.get(
    `https://api.collegefootballdata.com/games?year=${moment().format(
      "YYYY"
    )}&seasonType=regular&division=fbs`,
    {
      headers: {
        Authorization: `Bearer ${process.env.CFBD_KEY}`,
      },
    }
  );
  res.status(200).json([[...calendar.data], [...games.data]]);
};
