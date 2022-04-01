const PasswordList = props => {
  const {listDetails, isChecked, deleteItem, id} = props
  const {username, password, website, initial} = listDetails
  const onDelete = () => {
    deleteItem(id)
  }
  return (
    <li>
      <p>{initial}</p>
      <div>
        <p>{website}</p>
        <p>{username} </p>
        {!isChecked && (
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
            alt="stars"
          />
        )}
        {isChecked && <p>{password}</p>}
      </div>
      <button type="button" onClick={onDelete()}>
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
          alt="delete"
        />
      </button>
    </li>
  )
}

export default PasswordList
