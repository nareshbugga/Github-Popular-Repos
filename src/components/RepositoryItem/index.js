// Write your code here
import './index.css'

const RepositoryItem = props => {
  const {eachRepos} = props
  const {name, avatarUrl, starsCount, forksCount, issuesCount} = eachRepos
  return (
    <li className="list-container">
      <img src={avatarUrl} alt={name} className="repos-image" />
      <h1 className="repos-heading">{name}</h1>
      <div className="flex-count">
        <img
          src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
          alt="stars"
          className="count-image"
        />
        <p className="count-heading">{starsCount} stars</p>
      </div>
      <div className="flex-count">
        <img
          src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png"
          alt="forks"
          className="count-image"
        />
        <p className="count-heading">{forksCount} forks</p>
      </div>
      <div className="flex-count">
        <img
          src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png"
          alt="open issues"
          className="count-image"
        />
        <p className="count-heading">{issuesCount} open issues</p>
      </div>
    </li>
  )
}

export default RepositoryItem
