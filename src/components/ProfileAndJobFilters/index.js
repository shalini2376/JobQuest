import './index.css'
import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

const apiStatusConstant = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class ProfileAndJobFilters extends Component {
  state = {
    profileDetails: [],
    apiStatus: apiStatusConstant.initial,
  }

  componentDidMount() {
    this.getProfileData()
  }

  getProfileData = async () => {
    this.setState({
      apiStatus: apiStatusConstant.inProgress,
    })
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = 'https://apis.ccbp.in/profile'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    try {
      const response = await fetch(apiUrl, options)
      const data = await response.json()
      const profileData = data.profile_details
      if (response.ok) {
        this.setState({
          apiStatus: apiStatusConstant.success,
          profileDetails: profileData,
        })
      } else {
        this.setState({
          apiStatus: apiStatusConstant.failure,
        })
      }
    } catch (error) {
      console.log(`Network error: ${error}`)
      this.setState({
        apiStatus: apiStatusConstant.failure,
      })
    }
  }

  onChangeEmploymentType = event => {
    const {activeEmploymentId} = this.props
    const selectedEmployment = event.target.value
    activeEmploymentId(selectedEmployment)
  }

  onChnageSalaryRange = event => {
    const {activeSalaryRange} = this.props
    const selectedSalaryRange = event.target.value
    activeSalaryRange(selectedSalaryRange)
  }

  renderLoaderView = () => (
    <div className="profile-loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderProfileView = () => {
    const {profileDetails} = this.state
    return (
      <div className="profile-view-container">
        <img
          className="profile-image"
          alt="profile"
          src={profileDetails.profile_image_url}
        />
        <h1 className="user-name">{profileDetails.name}</h1>
        <p className="user-bio">{profileDetails.short_bio}</p>
      </div>
    )
  }

  renderFailureView = () => (
    <div className="failure-view">
      <button
        onClick={this.getProfileData}
        type="button"
        className="profile-retry-btn"
      >
        Retry
      </button>
    </div>
  )

  renderEmploymentFilter = () => {
    const {employmentTypesList} = this.props
    return (
      <ul className="employment-filter-list-container">
        <h1 className="job-type-heading-filter">Type of Employment</h1>
        {employmentTypesList.map(item => (
          <li
            className="employment-type-container filter-margin"
            key={item.employmentTypeId}
          >
            <input
              type="checkbox"
              id={item.employmentTypeId}
              onChange={this.onChangeEmploymentType}
              value={item.employmentTypeId}
              className="chekbox-input"
            />
            <label className="label-text" htmlFor={item.employmentTypeId}>
              {item.label}
            </label>
          </li>
        ))}
      </ul>
    )
  }

  renderPackageFilter = () => {
    const {salaryRangesList, selectedSalary} = this.props
    return (
        <ul className="package-list-container">
        <h1 className="salary-range-heading">Salary Range</h1>
          {salaryRangesList.map(item => (
            <li
              className="salary-range-container filter-margin"
              key={item.salaryRangeId}
            >
              <input
                type="checkbox"
                id={item.salaryRangeId}
                value={item.salaryRangeId}
                onChange={this.onChnageSalaryRange}
                className="chekbox-input"
                checked={selectedSalary === item.salaryRangeId}
              />
              <label className="label-text" htmlFor={item.salaryRangeId}>
                {item.label}
              </label>
            </li>
          ))}
        </ul>
    )
  }

  renderFiltersView = () => (
    <div className="profile-section">
      {this.renderProfileView()}
      <hr className="hr-tag" />
      {this.renderEmploymentFilter()}
      <hr className="hr-tag" />
      {this.renderPackageFilter()}
    </div>
  )

  render() {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstant.inProgress:
        return this.renderLoaderView()
      case apiStatusConstant.success:
        return this.renderFiltersView()
      case apiStatusConstant.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }
}
export default ProfileAndJobFilters
