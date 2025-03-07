import JobListing from "./jobListing"
import JbInfoSect from "./components/jbInfosect"
import SearchBar from "./searchBar"

export default function JobsPage () {
  return (
    <>
      <SearchBar/>
      <div className="jb-main">
        <div>
          <div className="jb-dsply-ctgry">
            <p className="jb-dsply-cat">Best Matches</p>
            <p className="jb-dsply-cat">Most Recent</p>
            <p className="jb-dsply-cat">Saved Jobs</p>
          </div>
          <div className="hr-ln-jb-li">
            <hr className="hr-abs-jb-li"/>
            <hr className="no-show"/>
            <hr className="no-show"/>
          </div>
          <p className="jb-dsply-cat-desc">Browse jobs that best match your experience and skills</p>
          <div className="hr-ln-jb-li-2"></div>
          <JobListing/>
        </div>
        <JbInfoSect/>
      </div>
    </>
  )
}