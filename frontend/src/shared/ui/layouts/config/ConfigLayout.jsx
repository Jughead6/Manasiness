import "./ConfigLayout.css"
import PageTitle from "../../titles/page/PageTitle.jsx"
import ConfigContent from "./content/ConfigContent.jsx"
import LoadingOverlay from "../../modal/LoadingOverlay.jsx"

function ConfigLayout({ title, subtitle, formFields, informationValues, onSubmit, onCancel, isLoading = false, isSubmitting = false }) {
    return (
        <div className="shared-config-layout">
            <PageTitle title={title} subtitle={subtitle} />
            <ConfigContent
                formFields={formFields}
                informationValues={informationValues}
                onSubmit={onSubmit}
                onCancel={onCancel}
                isLoading={isLoading}
                isSubmitting={isSubmitting}
            />
            {isLoading ? <LoadingOverlay /> : null}
        </div>
    )
}

export default ConfigLayout
