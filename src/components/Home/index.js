import './index.css'
import {Link} from 'react-router-dom'
import Header from '../Header'

const Home = () => (
  <>
    <Header />
    <div className="home-bg-container">
      <div className="home-description-container">
        <h1 className="homepage-heading">Find the job that fits your life</h1>
        <p className="home-page-text">
          Millions of people are searching for jobs, salary information, company
          networks. Find the job that fits your abilities and potential.
        </p>
        <Link to="/jobs" className="find-job-link">
          <button type="button" className="find-job-btn">
            Find Jobs
          </button>
        </Link>
      </div>
    </div>
  </>
)
export default Home
