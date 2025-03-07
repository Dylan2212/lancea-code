export default function SearchBar () {
  return (
    <div className="search-bar-el">
      <div className="bar-and-show-filters">
        <div className="jb-srch-cntnr">
          <input className="jb-srch-br" type="search" name="jb-srch" id="jb-srch" placeholder="Search for jobs"/>
          <button className="dlt-srch">✖</button>
        </div>
        <p className="show-filters hov-standrd">Show advanced filters &#9660;</p>
      </div>
      <div className="search-filters">
        <div className="hourly-rate-filter">
          <p className="filter-title">Hourly rate</p>
          <div className="flex">
            <label htmlFor="min-hrly">Min:</label>
            <select className="select" name="min-hrly" id="min-hrly">
              <option value="$5">$0</option>
              <option value="$10">$10</option>
              <option value="$20">$20</option>
              <option value="$30">$30</option>
              <option value="$40">$40</option>
              <option value="$50">$50</option>
              <option value="$60">$60</option>
              <option value="$70">$70</option>
              <option value="$80">$80</option>
              <option value="$90">$90</option>
            </select>
            <p>/hr</p>
          </div>
          <div className="flex mt-2">
            <label htmlFor="max-hrly">Max:</label>
            <select className="select" name="max-hrly" id="max-hrly">
              <option value="$10">$10</option>
              <option value="$20">$20</option>
              <option value="$30">$30</option>
              <option value="$10">$40</option>
              <option value="$10">$50</option>
              <option value="$10">$60</option>
              <option value="$10">$70</option>
              <option value="$10">$80</option>
              <option value="$10">$90</option>
              <option value="$10">$100</option>
            </select>
            <p>/hr</p>
          </div>
        </div>
        <div className="hourly-rate-filter">
          <p className="filter-title">Talent type</p>
          <div>
            <input type="checkbox" name="freelancer-check" id="freelancer-check" />
            <label htmlFor="freelancer-check" className="ml-1">Freelancer</label>
          </div>
          <div className="mt-2">
            <input type="checkbox" name="agency-check" id="agency-check" />
            <label htmlFor="agency-check" className="ml-1">Agency</label>
          </div>
        </div>
        <div className="hourly-rate-filter">
          <p className="filter-title">Rating</p>
          <div>
            <label htmlFor="avg-rating">Avg rating:</label>
            <select className="select" name="avg-rating" id="avg-rating">
              <option value="Any">Any</option>
              <option value="1.0">1.0</option>
              <option value="1.5">1.5</option>
              <option value="2.0">2.0</option>
              <option value="3.0">3.0</option>
              <option value="4.0">4.0</option>
              <option value="5.0">5.0</option>
            </select>
          </div>
          <div className="mt-2">
            <label htmlFor="total-reviews">Total reviews:</label>
            <select className="select" name="total-reviews" id="total-reviews">
              <option value="Any">Any</option>
              <option value="0-10">0-10</option>
              <option value="11-20">11-20</option>
              <option value="21-30">21-30</option>
              <option value="31-40">31-40</option>
              <option value="41-50">41-50</option>
              <option value="50+">50+</option>
            </select>
          </div>
        </div>
        <div className="hourly-rate-filter">
          <p className="filter-title">Skills</p>
          <input className="search-skill-filter" type="text" placeholder="Search skills"/>
          <div className="filter-sklls-sect-div">
            <p className="filter-skll hov-standrd">Programming</p>
            <p className="filter-skll hov-standrd">CSS</p>
            <p className="filter-skll hov-standrd">Design</p>
            <p className="filter-skll hov-standrd">MongoDB</p>
            <p className="filter-skll hov-standrd">Leadership</p>
          </div>
        </div>
        <div className="hourly-rate-filter">
          <p className="filter-title">Languages</p>
          <input className="search-skill-filter" type="text" placeholder="Search languages"/>
          <div className="filter-sklls-sect-div">
            <p className="filter-skll hov-standrd">Programming</p>
            <p className="filter-skll hov-standrd">CSS</p>
            <p className="filter-skll hov-standrd">Design</p>
            <p className="filter-skll hov-standrd">MongoDB</p>
            <p className="filter-skll hov-standrd">Leadership</p>
          </div>
        </div>
        <div className="hourly-rate-filter">
          <p className="filter-title">Keywords/phrases</p>
          <input className="search-skill-filter" type="text" placeholder="Add keywords and phrases"/>
          <div className="filter-sklls-sect-div">
            <p className="filter-skll hov-standrd">Programming</p>
            <p className="filter-skll hov-standrd">CSS</p>
            <p className="filter-skll hov-standrd">Design</p>
            <p className="filter-skll hov-standrd">MongoDB</p>
            <p className="filter-skll hov-standrd">Leadership</p>
          </div>
        </div>
      </div>
    </div>
  )
}