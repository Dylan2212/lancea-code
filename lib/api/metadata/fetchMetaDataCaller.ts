export async function fetchMetaDataCaller () {
  return (await (fetch("/api/metadata"))).json()
}