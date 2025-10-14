import './index.css'
import {Link} from 'react-router-dom'
import {BsSearch} from 'react-icons/bs'
import {FaStar, FaLaptopCode} from 'react-icons/fa'
import {VscLocation} from 'react-icons/vsc'

const JobCard = props => {
  const {searchInputValue, jobsList = []} = props

  let searchValue
  const handleSearchValueChange = event => {
    searchValue = event.target.value
  }

  const onClickInput = () => {
    searchInputValue(searchValue)
  }

  const renderNoJobsFound = () => (
    <div className="no-jobs-container">
      <img
        className="no-jobs-img"
        alt="no jobs"
        src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
      />
      <h1 className="no-job-found-heading">No Jobs Found</h1>
      <p className="no-job-para">
        We could not find any jobs. Try other filters
      </p>
    </div>
  )

  return (
    <div className="job-card-container">
      <div className="input-field-and-icon-div">
        <input
          onChange={handleSearchValueChange}
          type="search"
          className="search-input-field"
          placeholder="Search"
        />
        <button
          type="button"
          data-testid="searchButton"
          className="search-button"
          onClick={onClickInput}
        >
          <BsSearch className="search-icon" />
        </button>
      </div>
      {jobsList.length === 0 ? (
        renderNoJobsFound()
      ) : (
        <ul className="job-item-list-container">
          {jobsList.map(item => (
            <li className="job-list-item" key={item.id}>
              <Link to={`/jobs/${item.id}`} className="job-link-container">
                <div className="job-card-div">
                  <div className="logo-title-and-rating-div">
                    <img
                      className="job-card-logo-img"
                      alt="company logo"
                      src={item.companyLogoUrl}
                    />
                    <div className="title-and-rating-div">
                      <h1 className="title-text">{item.title}</h1>
                      <div className="star-and-rating-count-div">
                        <FaStar className="star-icon" />
                        <p className="rating-text">{item.rating}</p>
                      </div>
                    </div>
                  </div>
                  <div className="location-jobType-package-div">
                    <div className="location-and-designation-div">
                      <div className="style-icon-and-text-div">
                        <VscLocation className="style-icon location" />
                        <p className="location-text">{item.location}</p>
                      </div>
                      <div className="style-icon-and-text-div">
                        <FaLaptopCode className="style-icon laptop" />
                        <p className="employment-type-text">
                          {item.employmentType}
                        </p>
                      </div>
                    </div>
                    <span className="package">{item.packagePerAnnum}</span>
                  </div>
                  <hr className="hr-tag" />
                  <h1 className="description-heading">Description</h1>
                  <p className="descriptiom-text">{item.jobDescription}</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
export default JobCard
