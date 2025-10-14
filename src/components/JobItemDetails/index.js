import './index.css'
import {Component} from 'react'
import Cookie from 'js-cookie'
import {FaStar, FaLaptopCode, FaExternalLinkAlt} from 'react-icons/fa'
import {VscLocation} from 'react-icons/vsc'
import Loader from 'react-loader-spinner'
import Header from '../Header'

const apiStatusConstant = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class JobItemDetails extends Component {
  state = {
    jobDetails: [],
    similiarJobs: [],
    apiStatus: apiStatusConstant.initial,
  }

  componentDidMount() {
    this.getJobDetails()
  }

  getJobDetails = async () => {
    this.setState({
      apiStatus: apiStatusConstant.inProgress,
    })
    const {match} = this.props
    const {params} = match
    const {id} = params
    // console.log(id)
    const jwtToken = Cookie.get('jwt_token')
    const jobDetailsApiUrl = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    try {
      const response = await fetch(jobDetailsApiUrl, options)
      const jobData = await response.json()
      if (response.ok) {
        this.setState({
          jobDetails: jobData.job_details,
          similiarJobs: jobData.similar_jobs,
          apiStatus: apiStatusConstant.success,
        })
      } else {
        this.setState({
          apiStatus: apiStatusConstant.failure,
        })
      }
    } catch (error) {
      console.log(`Network Error: ${error}`)
      this.setState({
        apiStatus: apiStatusConstant.failure,
      })
    }
  }

  renderJobDetails = () => {
    const {jobDetails} = this.state
    const formattedData = {
      companyLogoUrl: jobDetails.company_logo_url,
      companyWebsiteUrl: jobDetails.company_website_url,
      employmentType: jobDetails.employment_type,
      id: jobDetails.id,
      jobDescription: jobDetails.job_description,
      skills: jobDetails.skills,
      lifeAtCompany: jobDetails.life_at_company,
      location: jobDetails.location,
      packagePerAnnum: jobDetails.package_per_annum,
      rating: jobDetails.rating,
      title: jobDetails.title,
    }
    const {skills} = formattedData
    const {lifeAtCompany} = formattedData
    return (
      <div className="job-details-container">
        <div className="job-details-div">
          <div className="logo-title-and-rating-div">
            <img
              className="job-card-logo-img"
              alt="job details company logo"
              src={formattedData.companyLogoUrl}
            />
            <div className="title-and-rating-div">
              <h1 className="job-details-title-text">{formattedData.title}</h1>
              <div className="star-and-rating-count-div">
                <FaStar className="star-icon" />
                <p className="rating-text">{formattedData.rating}</p>
              </div>
            </div>
          </div>
          <div className="location-jobType-package-div">
            <div className="location-and-designation-div">
              <div className="style-icon-and-text-div">
                <VscLocation className="style-icon location" />
                <p className="location-text">{formattedData.location}</p>
              </div>
              <div className="style-icon-and-text-div">
                <FaLaptopCode className="style-icon laptop" />
                <p className="employment-type-text">
                  {formattedData.employmentType}
                </p>
              </div>
            </div>
            <p className="package-text">{formattedData.packagePerAnnum}</p>
          </div>
          <hr className="hr-tag" />
          <div className="description-and-link-div">
            <h1 className="description-heading">Description</h1>
            <a className="company-url" href={formattedData.companyWebsiteUrl}>
              Visit
              <FaExternalLinkAlt className="visit-icon" />
            </a>
          </div>
          <p className="descriptiom-text">{formattedData.jobDescription}</p>
          <h1 className="skills-heading">Skills</h1>
          <ul className="skills-div">
            {skills &&
              skills.map(item => (
                <li className="skill-logo-and-name-div" key={item.name}>
                  <img
                    className="skill-logo-img"
                    alt={item.name}
                    src={item.image_url}
                  />
                  <span>{item.name}</span>
                </li>
              ))}
          </ul>
          <h1 className="life-at-company-heading">Life at Company</h1>
          {lifeAtCompany && (
            <div className="life-at-company-div">
              <img
                className="life-at-company-sm-img"
                alt="life at company"
                src={lifeAtCompany.image_url}
              />
              <p className="descriptiom-text">{lifeAtCompany.description}</p>
              <img
                className="life-at-company-img"
                alt="life at company"
                src={lifeAtCompany.image_url}
              />
            </div>
          )}
        </div>
      </div>
    )
  }

  renderSimiliarJobs = () => {
    const {similiarJobs} = this.state
    return (
      <>
        <h1 className="similiar-jobs-heading">Similiar Jobs</h1>
        <ul className="similiar-jobs-container">
          {similiarJobs &&
            similiarJobs.map(item => (
              <li key={item.id} className="similiar-jobs-individual-card">
                <div className="logo-title-and-rating-div">
                  <img
                    className="job-card-logo-img"
                    alt="similar job company logo"
                    src={item.company_logo_url}
                  />
                  <div className="title-and-rating-div">
                    <h1 className="similiar-job-title-text">{item.title}</h1>
                    <div className="star-and-rating-count-div">
                      <FaStar className="star-icon" />
                      <p className="rating-text">{item.rating}</p>
                    </div>
                  </div>
                </div>
                <h1 className="description-heading">Description</h1>
                <p className="descriptiom-text">{item.job_description}</p>
                <div className="similir-job-location-and-designation-div">
                  <div className="style-icon-and-text-div margin">
                    <VscLocation className="style-icon location" />
                    <p className="similiar-job-location-text">
                      {item.location}
                    </p>
                  </div>
                  <div className="style-icon-and-text-div margin">
                    <FaLaptopCode className="style-icon laptop" />
                    <p className="similiar-job-employment-type">
                      {item.employment_type}
                    </p>
                  </div>
                </div>
              </li>
            ))}
        </ul>
      </>
    )
  }

  renderLoaderView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderJobDetailAndSimiliarJobs = () => (
    <>
      {this.renderJobDetails()}
      {this.renderSimiliarJobs()}
    </>
  )

  renderFailureView = () => (
    <div className="job-details-failure-view">
      <img
        className="failure-img"
        alt="failure view"
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
      />
      <h1 className="failure-heading">Oops! Something Went Wrong</h1>
      <p className="failure-para">
        We cannot seem to find the page you are looking for
      </p>
      <button type="button" className="retry-btn" onClick={this.getJobDetails}>
        Retry
      </button>
    </div>
  )

  render() {
    const {apiStatus} = this.state
    let view
    switch (apiStatus) {
      case apiStatusConstant.inProgress:
        view = this.renderLoaderView()
        break
      case apiStatusConstant.success:
        view = this.renderJobDetailAndSimiliarJobs()
        break
      case apiStatusConstant.failure:
        view = this.renderFailureView()
        break
      default:
        view = null
    }
    return (
      <>
        <Header />
        <div className="job-details-and-similiar-job-container">{view}</div>
      </>
    )
  }
}
export default JobItemDetails
