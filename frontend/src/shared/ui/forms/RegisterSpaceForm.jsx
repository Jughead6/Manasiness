import "./RegisterSpaceForm.css"

function RegisterSpaceForm({ fields, sectionLabel, title, onCancel, onSubmit }) {
    function handleSubmit(e) {
        e.preventDefault()
        const formData = new FormData(e.target)
        const data = Object.fromEntries(formData.entries())
        onSubmit(data)
    }

    return (
        <form className="shared-register-space-form" onSubmit={handleSubmit}>
            <h4>{sectionLabel}----</h4>
            <h1>{title}</h1>
            {fields.map((field) => (
                <div key={field.id}>
                    <div className="shared-register-space-form-field">
                        <label htmlFor={field.id}>{field.label}</label>

                        {field.options ? (
                            <select
                                id={field.id}
                                name={field.name}
                                defaultValue={field.defaultValue ?? ''}
                                required={field.required}
                                disabled={field.disabled}
                            >
                                {field.options.map((option) => (
                                    <option
                                        key={option.value}
                                        value={option.value}
                                        disabled={option.disabled}
                                    >
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                        ) : field.type === 'textarea' ? (
                            <textarea
                                id={field.id}
                                name={field.name}
                                placeholder={field.placeholder}
                                defaultValue={field.defaultValue ?? ''}
                                required={field.required}
                                disabled={field.disabled}
                            />
                        ) : (
                            <input
                                id={field.id}
                                name={field.name}
                                type={field.type}
                                placeholder={field.placeholder}
                                defaultValue={field.defaultValue ?? ''}
                                required={field.required}
                                disabled={field.disabled}
                            />
                        )}
                    </div>
                </div>
            ))}
            <div className="shared-register-space-form-actions">
                <button type="submit">Register</button>
                <button type="button" onClick={onCancel}>Cancel</button>
            </div>
        </form>
    )
}

export default RegisterSpaceForm