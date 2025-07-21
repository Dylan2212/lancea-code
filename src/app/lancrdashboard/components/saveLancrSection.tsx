type myProps = {
  type: "submit" | "button" | "reset",
  saving?: boolean
}

export default function SaveLancrSection ({ type, saving }: myProps) {
  return (
    <>
      <button className="px-6 py-2 rounded-md bg-purple-600 text-white text-lg ml-[80%] my-3 hover:bg-purple-500 hov-standrd w-32" type={type}>{saving ? "Saving..." : "Save"}</button>
    </>
  )
}