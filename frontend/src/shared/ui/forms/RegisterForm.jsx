import "./RegisterForm.css"

function RegisterForm({ fields, sectionLabel, title, onCancel, onSubmit }) {
    function handleSubmit(e) {
        e.preventDefault()
        const formData = new FormData(e.target)
        const data = Object.fromEntries(formData.entries())
        onSubmit(data)
    }

    return (
        <form className="shared-register-form" onSubmit={handleSubmit}>
            <h4>{sectionLabel}----</h4>
            <h1>{title}</h1>
            {fields.map((field) => (
                <div key={field.id}>
                    <div className="shared-register-form-field">
                        <label htmlFor={field.id}>{field.label}</label>

                        {field.options ? (
                            <select id={field.id} name={field.name} defaultValue="">
                                {field.options.map((option) => (
                                    <option key={option.value} value={option.value}>{option.label}</option>
                                ))}
                            </select>
                        ) : field.type === 'textarea' ? (
                            <textarea
                                id={field.id}
                                name={field.name}
                                placeholder={field.placeholder}
                            />
                        ) : (
                            <input
                                id={field.id}
                                name={field.name}
                                type={field.type}
                                placeholder={field.placeholder}
                            />
                        )}
                    </div>
                </div>
            ))}
            <div className="shared-register-form-actions">
                <button type="submit">Register</button>
                <button type="button" onClick={onCancel}>Cancel</button>
            </div>
        </form>
    )
}

export default RegisterForm