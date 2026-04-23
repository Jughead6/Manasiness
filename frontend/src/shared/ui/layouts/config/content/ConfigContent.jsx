import "./ConfigContent.css"

function ConfigContent({ formFields = [], informationValues = {}, onSubmit, onCancel, isLoading = false, isSubmitting = false }) {
    const hasImageField = formFields.some((item) => item.name === "image")

    function handleSubmit(e) {
        e.preventDefault()

        if (isSubmitting || isLoading) {
            return
        }

        const formData = new FormData(e.target)
        const data = Object.fromEntries(formData.entries())
        onSubmit(data)
    }

    return (
        <form key={JSON.stringify(informationValues)} className="shared-config-content" onSubmit={handleSubmit}>
            <div className="shared-config-content-information">
                <div className="shared-config-content-fields">
                    {formFields.map((item) => (
                        <fieldset className="shared-config-content-field" key={item.id}>
                            <legend>{item.label}</legend>
                            <input
                                id={item.id}
                                name={item.name}
                                placeholder={item.placeholder}
                                type={item.type}
                                required={item.required}
                                defaultValue={informationValues[item.name] || ""}
                                autoComplete={item.autoComplete}
                                minLength={item.minLength}
                                maxLength={item.maxLength}
                                disabled={item.disabled || isSubmitting || isLoading}
                                readOnly={item.readOnly}
                            />
                        </fieldset>
                    ))}
                </div>

                {hasImageField ? (
                    <fieldset className="shared-config-content-image">
                        <legend>Image Profile</legend>
                        <img src={informationValues.image || "https://i.postimg.cc/DzKtGYCx/nouserphoto.png"} alt="Profile" />
                    </fieldset>
                ) : null}
            </div>

            <div className="shared-config-content-button">
                <button type="submit" id="submit" disabled={isSubmitting || isLoading}>{isSubmitting ? "Saving..." : "Save"}</button>
                <button type="button" id="cancel" onClick={onCancel} disabled={isSubmitting || isLoading}>Cancel</button>
            </div>
        </form>
    )
}

export default ConfigContent
