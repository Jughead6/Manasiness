import "./ConfigLayout.css"
import PageTitle from "../../titles/page/PageTitle.jsx"
import ConfigContent from "./content/ConfigContent.jsx"

function ConfigLayout(data) {
    const { title, subtitle, formFields, informationValues, onSubmit, onCancel } = data

    return (
        <div className="shared-config-layout">
            <PageTitle
                title={title}
                subtitle={subtitle}
            />
            <ConfigContent
                formFields={formFields}
                informationValues={informationValues}
                onSubmit={onSubmit}
                onCancel={onCancel}
            />
        </div>
    )
}

export default ConfigLayout