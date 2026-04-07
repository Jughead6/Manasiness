import './EntityForm.css'

function EntityForm({ sectionLabel, title, fields, onCancel, onSubmit }) {
    function handleSubmit(e) {
        e.preventDefault()
        const formData = new FormData(e.target)
        const data = Object.fromEntries(formData.entries())
        onSubmit(data)
    }
    
    return (
        <form className="shared-entity-form" onSubmit={handleSubmit}>
            <h4>{sectionLabel}</h4>
            <h2>{title}</h2>

            <div className="shared-entity-form-rows">
                {fields.map((field) => (
                    <div className="shared-entity-form-group" key={field.id}>
                        <label htmlFor={field.id}>{field.label}</label>
                        <input id={field.id} name={field.name} type={field.type} placeholder={field.placeholder}/>
                    </div>
                ))}
            </div>

            <div className="shared-entity-form-actions">
                <button type="submit">Create</button>
                <button type="button" onClick={onCancel}>Cancel</button>
            </div>
        </form>
    )
}

export default EntityForm