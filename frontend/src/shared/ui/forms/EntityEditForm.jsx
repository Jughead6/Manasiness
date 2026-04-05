import './EntityEditForm.css'

function EntityEditForm({ fields, sectionLabel, title }) {
    return (
        <form className="shared-entity-edit-form">
            <div className="shared-entity-edit-form-hero">
                <h4>{sectionLabel}----</h4>
                <h1>{title}: EJEMPLO</h1>
            </div>
            <div className="shared-entity-edit-form-content">
                {fields.map((field) => (
                    <div className="shared-entity-edit-form-group" key={field.id}>
                        <label htmlFor={field.id}>{field.label}</label>
                        <input id={field.id} placeholder={field.placeholder} type={field.type} />
                    </div>
                ))}
                <div className="shared-entity-edit-form-actions">
                    <button>Save</button>
                    <button>Cancel</button>
                </div>
            </div>
        </form>
    )
}

export default EntityEditForm