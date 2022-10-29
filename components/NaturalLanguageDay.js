import Moment from "react-moment"
import moment from "moment"

const NaturalLanguageDay = ({ date }) => {
  const yesterday = moment().subtract(1, "day").format("MM/DD")
  const today = moment().format("MM/DD")
  const tomorrow = moment().add(1, "day").format("MM/DD")

  if (moment(date).format("MM/DD") === yesterday) return "Yesterday"
  if (moment(date).format("MM/DD") === today) return "Today"
  if (moment(date).format("MM/DD") === tomorrow) return "Tomorrow"
  return (
    <Moment format="dddd MM/DD" interval={0}>
      {date}
    </Moment>
  )
}

export default NaturalLanguageDay
