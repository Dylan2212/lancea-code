import AddServiceComponent from "../components/addServiceComponent";

export default async function Page ({ searchParams }: { searchParams: Promise<{ action?: string; idx?: string }> }) {
  const params = await searchParams
  const action = params.action ?? "add"
  const index = params.idx === "null" ? null : Number(params.idx ?? -1)

  return (
    <div className="w-full">
      <AddServiceComponent action={action} index={index}/>
    </div>
  )
}