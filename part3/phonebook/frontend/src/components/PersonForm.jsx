const PersonForm = ({ onSubmit, nameValue, onNameChange, phoneValue, onPhoneChange }) => (
    <form onSubmit={onSubmit}>
        <div>
            name: <input value={nameValue} onChange={onNameChange} />
        </div>
        <div>
            phone: <input value={phoneValue} onChange={onPhoneChange} />
        </div>
        <div>
            <button type="submit">Add</button>
        </div>
    </form>
)

export default PersonForm