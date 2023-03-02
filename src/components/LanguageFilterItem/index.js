// Write your code here
import './index.css'

const LanguageFilterItem = props => {
  const {eachData, condition, clickActiveTab} = props
  const {id, language} = eachData
  const style = condition ? 'active-style' : null
  const onTabClick = () => clickActiveTab(id)
  return (
    <li className="filter-list">
      <button
        type="button"
        className={`filter-button ${style}`}
        onClick={onTabClick}
      >
        {language}
      </button>
    </li>
  )
}

export default LanguageFilterItem
