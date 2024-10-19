export const Progress = ({
  current,
  total
}: {
  current: number
  total: number
}) => {
  return (
    <div>
      {current}/{total}
    </div>
  )
}
