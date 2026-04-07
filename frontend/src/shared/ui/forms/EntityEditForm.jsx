import "./EntityEditForm.css"

function EntityEditForm({ fields, sectionLabel, title, values, onCancel, onSubmit }) {
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
                {fields.map((field) => (
                    <div className="shared-entity-edit-form-group" key={field.id}>
                        <label htmlFor={field.id}>{field.label}</label>

                        {field.options ? (
                            <select id={field.id} name={field.name} defaultValue={values?.[field.name]}>
                                {field.options.map((option) => (
                                    <option key={option.value} value={option.value}>{option.label}</option>
                                ))}
                            </select>
                        ) : field.type === 'textarea' ? (
                            <textarea
                                id={field.id}
                                name={field.name}
                                placeholder={field.placeholder}
                                defaultValue={values?.[field.name] }
                            />
                        ) : (
                            <input
                                id={field.id}
                                name={field.name}
                                placeholder={field.placeholder}
                                type={field.type}
                                defaultValue={values?.[field.name]}
                            />
                        )}
                    </div>
                ))}
                <div className="shared-entity-edit-form-actions">
                    <button type="submit">Save</button>
                    <button type="button" onClick={onCancel}>Cancel</button>
                </div>
            </div>
        </form>
    )
}

export default EntityEditForm