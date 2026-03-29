import AddServiceComponent from "../components/addServiceComponent";

export default async function Page ({ searchParams }: { searchParams: Promise<{ action?: string; idx?: string }> }) {
  const params = await searchParams
  const action = params.action ?? "add"
  const index = Number(params.idx ?? -1)

  return (
    <div>
      <AddServiceComponent action={action} index={index}/>
    </div>
  )
}