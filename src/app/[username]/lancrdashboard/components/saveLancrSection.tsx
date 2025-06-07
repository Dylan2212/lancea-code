type myProps = {
  type: "submit" | "button" | "reset"
}

export default function SaveLancrSection ({ type }: myProps) {
  return (
    <>
      <button className="px-6 py-2 rounded-md bg-purple-600 text-white text-lg ml-[80%] mb-6 hover:bg-purple-500 hov-standrd" type={type}>Save</button>
    </>
  )
}