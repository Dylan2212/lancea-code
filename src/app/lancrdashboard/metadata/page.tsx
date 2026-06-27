"use client"
import SearchData from "./components/searchData";
import OgData from "./components/ogData";
import { useMetaDataManager } from "../../hooks/metadata/useMetaData";


//THINK FETCHES ON RELOAD OR SECTION CLICK EVERYTIME, SHOULD STOP THIS LIKELY

//UPDATE IMAGE OF DATA
export default function Page () {
  const { ogMetaData, searchMetaData, setOgMetaData, setSearchMetaData, saveMetaData, handleFileChange, resetSearchMetaData, resetOgMetaData } = useMetaDataManager()

  return (
    <section className="pt-16 w-screen lg:w-full pb-12">
      <h1 className="text-2xl font-semibold m-5 mb-0">MetaData</h1>
      <h2 className="ml-5 text-sm max-w-[75%]">Optimize your portfolio for search and social platforms</h2>
      <SearchData searchMetaData={searchMetaData} setSearchMetaData={setSearchMetaData} saveMetaData={saveMetaData} resetSearchMetaData={resetSearchMetaData}/>
      <OgData handleFileChange={handleFileChange} ogMetaData={ogMetaData} setOgMetaData={setOgMetaData} saveMetaData={saveMetaData} resetOgMetaData={resetOgMetaData}/>
    </section>
  )
}