import './EntityForm.css'

function EntityForm({ sectionLabel, title, fields, onCancel }) {
    return (
        <form className="shared-entity-form">
            <h4 className="shared-entity-form-section">{sectionLabel}</h4>
            <h2 className="shared-entity-form-title">{title}</h2>

            <div className="shared-entity-form-rows">
                {fields.map((field) => (
                    <div className="shared-entity-form-group" key={field.id}>
                        <label htmlFor={field.id}>{field.label}</label>

                        {field.type === 'textarea' ? (
                            <textarea id={field.id} placeholder={field.placeholder}></textarea>
                        ) : (
                            <input id={field.id} type={field.type} placeholder={field.placeholder}/>
                        )}
                    </div>
                ))}
            </div>

            <div className="shared-entity-form-actions">
                <button type="submit">Save</button>
                <button type="button" onClick={onCancel}>Cancel</button>
            </div>
        </form>
    )
}

export default EntityForm