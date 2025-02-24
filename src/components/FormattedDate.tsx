import {Text} from './ui/text'

export default function FormattedDate({createdAt}: any) {
  // Parse the given date string into a JavaScript Date object
  const dateObject = new Date(createdAt)

  // Format the date object according to your requirements
  const formattedDate = `${dateObject.toLocaleDateString()} `
  const formattedTime = `${dateObject.toLocaleTimeString()}`

  return (
    <Text className="font-medium text-md">
      {formattedDate} {''} {formattedTime}
    </Text>
  )
}
