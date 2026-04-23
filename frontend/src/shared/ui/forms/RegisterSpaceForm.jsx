import "./RegisterSpaceForm.css"

function RegisterSpaceForm({ fields, sectionLabel, title, helperMessage = "", onCancel, onSubmit, isSubmitting = false }) {
    const safeFields = Array.isArray(fields) ? fields : []

    function handleSubmit(e) {
        e.preventDefault()
        const formData = new FormData(e.target)
        const data = Object.fromEntries(formData.entries())
        onSubmit(data)
    }

    return (
        <form className="shared-register-space-form" onSubmit={handleSubmit}>
            <div className="shared-register-space-form-title">
                <h4>{sectionLabel}----</h4>
                <h1>{title}</h1>
            </div>
            <div className="shared-register-space-form-fields">
                {helperMessage ? <p>{helperMessage}</p> : null}
                {safeFields.map((field) => (
                    <div className="shared-register-space-form-field" key={field.id}>
                        <label htmlFor={field.id}>{field.label}</label>

                        {field.options ? (
                            <select
                                id={field.id}
                                name={field.name}
                                defaultValue={field.defaultValue ?? ""}
                                required={field.required}
                                disabled={field.disabled || isSubmitting}
                            >
                                {field.options.map((option) => (
                                    <option key={option.value} value={option.value} disabled={option.disabled}>{option.label}</option>
                                ))}
                            </select>
                        ) : field.type === "textarea" ? (
                            <textarea
                                id={field.id}
                                name={field.name}
                                placeholder={field.placeholder}
                                defaultValue={field.defaultValue ?? ""}
                                required={field.required}
                                disabled={field.disabled || isSubmitting}
                            />
                        ) : (
                            <input
                                id={field.id}
                                name={field.name}
                                type={field.type}
                                placeholder={field.placeholder}
                                defaultValue={field.defaultValue ?? ""}
                                required={field.required}
                                disabled={field.disabled || isSubmitting}
                                min={field.min}
                                step={field.step}
                                inputMode={field.inputMode}
                            />
                        )}
                    </div>
                ))}
                <div className="shared-register-space-form-actions">
                    <button id="submit" type="submit" disabled={isSubmitting}>{isSubmitting ? "Saving..." : "Register"}</button>
                    <button id="cancel" type="button" onClick={onCancel} disabled={isSubmitting}>Cancel</button>
                </div>
            </div>
        </form>
    )
}

export default RegisterSpaceForm
