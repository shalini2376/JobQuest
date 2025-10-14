import './index.css'

const NotFound = () => (
  <div className="not-found-container">
    <img
      className="not-found-img"
      alt="not found"
      src="https://assets.ccbp.in/frontend/react-js/jobby-app-not-found-img.png"
    />
    <h1 className="not-found-heading">Page Not Found</h1>
    <p>we are sorry, the page you requested could not be found</p>
    <button type="button" className="notfound-page-retry-btn">
      Retry
    </button>
  </div>
)
export default NotFound
