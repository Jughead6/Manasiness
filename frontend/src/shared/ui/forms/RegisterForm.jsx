import './RegisterForm.css'

function RegisterForm({ fields, sectionLabel, title, onCancel }) {
    return (
        <form className='shared-register-form'>
            <h4>{sectionLabel}----</h4>
            <h1>{title}</h1>
            {fields.map((field) => (
                <div key={field.id}>
                    <div className='shared-register-form-field'>
                        <label htmlFor={field.id}>{field.label}</label>
                        <input id={field.id} placeholder={field.placeholder} type={field.type}></input>
                    </div>
                </div>
            ))}
            <div className='shared-register-form-actions'>
                <button>Register</button>
                <button type='submit' onClick={onCancel}>Cancel</button>
            </div>
        </form>
    )
}

export default RegisterForm