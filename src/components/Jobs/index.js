import './index.css'
import Cookie from 'js-cookie'
import Loader from 'react-loader-spinner'
import {Component} from 'react'
import Header from '../Header'
import ProfileAndJobFilters from '../ProfileAndJobFilters'
import JobCard from '../JobCard'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const apiStatusConstant = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Jobs extends Component {
  state = {
    preferedEmploymentType: [],
    preferedSalaryRange: '',
    searchInput: '',
    jobsList: [],
    apiStatus: apiStatusConstant.initial,
  }

  componentDidMount() {
    this.getJobs()
  }

  activeEmploymentId = selectedEmployment => {
    this.setState(prevState => {
      const isAlreadySelected =
        prevState.preferedEmploymentType.includes(selectedEmployment)
      const updatedList = isAlreadySelected
        ? prevState.preferedEmploymentType.filter(
            type => type !== selectedEmployment,
          )
        : [...prevState.preferedEmploymentType, selectedEmployment]

      return {preferedEmploymentType: updatedList}
    }, this.getJobs)
  }

  activeSalaryRange = selected => {
    this.setState(
      {
        preferedSalaryRange: selected,
      },
      this.getJobs,
    )
  }

  searchInputValue = searchValue => {
    this.setState(
      {
        searchInput: searchValue,
      },
      this.getJobs,
    )
  }

  /* 
    const {
      preferedEmploymentType,
      preferedSalaryRange,
      searchInput,
    } = this.state
  */

  getJobs = async () => {
    const {preferedEmploymentType, preferedSalaryRange, searchInput} =
      this.state
    const employmentString = preferedEmploymentType.join(',')
    this.setState({
      apiStatus: apiStatusConstant.inProgress,
    })
    try {
      const jwtToken = Cookie.get('jwt_token')
      const jobsApiUrl = `https://apis.ccbp.in/jobs?employment_type=${employmentString}&minimum_package=${preferedSalaryRange}&search=${searchInput}`
      const options = {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      }
      const response = await fetch(jobsApiUrl, options)
      const jobData = await response.json()
      const jobArray = jobData.jobs
      const formattedData = jobArray.map(item => ({
        companyLogoUrl: item.company_logo_url,
        employmentType: item.employment_type,
        id: item.id,
        jobDescription: item.job_description,
        location: item.location,
        packagePerAnnum: item.package_per_annum,
        rating: item.rating,
        title: item.title,
      }))
      if (response.ok) {
        this.setState({
          jobsList: formattedData,
          apiStatus: apiStatusConstant.success,
        })
      } else {
        this.setState({
          apiStatus: apiStatusConstant.failure,
        })
      }
    } catch (error) {
      console.log(`Netwok Error ${error}`)
      this.setState({
        apiStatus: apiStatusConstant.failure,
      })
    }
  }

  renderLoaderView = () => (
    <div className="job-card-loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderFailureView = () => (
    <div className="failure-view-container align-center">
      <img
        className="jobs-page-failure-img"
        alt="failure view"
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
      />
      <h1 className="job-page-failure-heading">Oops! Something Went Wrong</h1>
      <p className="failure-view-text">
        We cannot seem to find the page you are looking for
      </p>
      <button
        onClick={this.getJobs}
        className="failure-view-retry-btn"
        type="button"
      >
        Retry
      </button>
    </div>
  )

  render() {
    const {jobsList, apiStatus, preferedSalaryRange} = this.state
    let jobCardView
    switch (apiStatus) {
      case apiStatusConstant.inProgress:
        jobCardView = this.renderLoaderView()
        break
      case apiStatusConstant.success:
        jobCardView = (
          <JobCard
            jobsList={jobsList}
            searchInputValue={this.searchInputValue}
          />
        )
        break
      case apiStatusConstant.failure:
        jobCardView = this.renderFailureView()
        break
      default:
        jobCardView = null
    }
    return (
      <>
        <Header />
        <div className="profile-and-jobcard-container">
          <ProfileAndJobFilters
            employmentTypesList={employmentTypesList}
            activeEmploymentId={this.activeEmploymentId}
            salaryRangesList={salaryRangesList}
            activeSalaryRange={this.activeSalaryRange}
            selectedSalary={preferedSalaryRange}
          />
          {jobCardView}
        </div>
      </>
    )
  }
}
export default Jobs
