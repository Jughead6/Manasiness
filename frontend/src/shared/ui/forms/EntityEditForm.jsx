import "./EntityEditForm.css"

function EntityEditForm({ fields, sectionLabel, title, values, onCancel, onSubmit }) {
    const safeFields = Array.isArray(fields) ? fields : []

    function handleSubmit(e) {
        e.preventDefault()
        const formData = new FormData(e.target)
        const data = Object.fromEntries(formData.entries())
        onSubmit(data)
    }

    return (
        <form className="shared-entity-edit-form" onSubmit={handleSubmit}>
            <div className="shared-entity-edit-form-hero">
                <h4>{sectionLabel}----</h4>
                <h1>{title}</h1>
            </div>
            <div className="shared-entity-edit-form-content">
                {safeFields.map((field) => (
                    <div className="shared-entity-edit-form-group" key={field.id}>
                        <label htmlFor={field.id}>{field.label}</label>

                        {field.options ? (
                            <select
                                id={field.id}
                                name={field.name}
                                defaultValue={values?.[field.name] ?? field.defaultValue ?? ''}
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
                                defaultValue={values?.[field.name] ?? field.defaultValue ?? ''}
                                required={field.required}
                                disabled={field.disabled}
                            />
                        ) : (
                            <input
                                id={field.id}
                                name={field.name}
                                placeholder={field.placeholder}
                                type={field.type}
                                defaultValue={values?.[field.name] ?? field.defaultValue ?? ''}
                                required={field.required}
                                disabled={field.disabled}
                            />
                        )}
                    </div>
                ))}
                <div className="shared-entity-edit-form-actions">
                    <button id="submit" type="submit">Save</button>
                    <button id="cancel" type="button" onClick={onCancel}>Cancel</button>
                </div>
            </div>
        </form>
    )
}

export default EntityEditForm