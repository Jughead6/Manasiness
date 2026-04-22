import "./ConfigContent.css"

function ConfigContent(data) {
    const { formFields, informationValues, onSubmit, onCancel } = data
    const hasImageField = formFields.some((item) => item.name === "image")

    function handleSubmit(e) {
        e.preventDefault()
        const formData = new FormData(e.target)
        const data = Object.fromEntries(formData.entries())
        onSubmit(data)
    }

    return (
        <form className="shared-config-content" onSubmit={handleSubmit}>
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
                <button type="submit" id="submit">Save</button>
                <button type="button" id="cancel" onClick={onCancel}>Cancel</button>
            </div>
        </form>
    )
}

export default ConfigContent