/* eslint-disable no-unused-vars */
import {Component} from 'react'
import Loader from 'react-loader-spinner'
import LanguageFilterItem from '../LanguageFilterItem'
import RepositoryItem from '../RepositoryItem'

import './index.css'

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

const views = {
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

// Write your code here
class GithubPopularRepos extends Component {
  state = {listRepos: [], activeTab: languageFiltersData[0].id, view: ''}

  componentDidMount() {
    this.getListRepositories()
  }

  getListRepositories = async () => {
    this.setState({view: views.inProgress})
    const {activeTab} = this.state
    console.log(activeTab)
    const apisUrl = `https://apis.ccbp.in/popular-repos?language=${activeTab}`
    const response = await fetch(apisUrl)
    console.log(response)
    if (response.ok === true) {
      const data = await response.json()
      console.log(data)
      const updateRepository = {
        popularRepos: data.popular_repos,
      }
      console.log(updateRepository)
      const {popularRepos} = updateRepository
      const updatedData = popularRepos.map(eachRepos => ({
        id: eachRepos.id,
        avatarUrl: eachRepos.avatar_url,
        name: eachRepos.name,
        starsCount: eachRepos.stars_count,
        forksCount: eachRepos.forks_count,
        issuesCount: eachRepos.issues_count,
      }))
      this.setState({listRepos: updatedData, view: views.success})
    } else if (response.status === 401) {
      this.setState({view: views.failure})
    }
  }

  clickActiveTab = id => {
    this.setState({activeTab: id}, this.getListRepositories)
  }

  listRepositories = () => {
    const {listRepos} = this.state
    return (
      <ul className="repos-list-container">
        {listRepos.map(eachRepos => (
          <RepositoryItem eachRepos={eachRepos} key={eachRepos.id} />
        ))}
      </ul>
    )
  }

  loading = () => (
    <div data-testid="loader" className="popular-container">
      <Loader type="ThreeDots" color="#0284c7" height={80} width={80} />
    </div>
  )

  failure = () => (
    <div className="popular-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
        className="failure-image"
      />
      <p>Something Went Wrong</p>
    </div>
  )

  HeaderRender = () => {
    const {activeTab} = this.state
    return (
      <div className="popular-container">
        <h1 className="popular-heading">Popular</h1>
        <ul className="filter-list-container">
          {languageFiltersData.map(eachData => (
            <LanguageFilterItem
              eachData={eachData}
              key={eachData.id}
              condition={activeTab === eachData.id}
              clickActiveTab={this.clickActiveTab}
            />
          ))}
        </ul>
      </div>
    )
  }

  resultViews = () => {
    const {view} = this.state
    switch (view) {
      case views.success:
        return this.listRepositories()
      case views.failure:
        return this.failure()
      case views.inProgress:
        return this.loading()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        {this.HeaderRender()}
        {this.resultViews()}
      </>
    )
  }
}

export default GithubPopularRepos
