type CoverObj = { coverUrl: string, position: number }

export type ProjectData = Partial<{
  title: string,
  description: string,
  link: string,
  results: string[],
  uploaded_urls: Record<string, string>[],
  cover: CoverObj | null,
  id: string
}>

import AddProjectClient from "../components/addProjectComponent"

export default async function Page({ searchParams }: { searchParams: Promise<{ action?: string; idx?: string }> }) {
  const params = await searchParams

  const projectAction = params.action
    ? params.action.charAt(0).toUpperCase() + params.action.slice(1)
    : "Add"

  const globalIndex = Number(params.idx ?? 0)

  return (
    <div className="pt-16 pb-10 lg:pb-0">
      <AddProjectClient
        globalIndex={globalIndex}
        projectAction={projectAction}
        setProjectPage={"NULL"}
      />
    </div>
  )
}