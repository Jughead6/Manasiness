import StatsTitle from "../../titles/stats/StatsTitle.jsx"

function StatsLayout({ className, titleClassName, contentClassName, toolbarClassName, title, description, toolbar = null, toolbarPosition = "before-content", children }) {
    return (
        <div className={className}>
            <div className={titleClassName}>
                <StatsTitle title={title} description={description} />
            </div>
            {toolbar && toolbarPosition === "before-content" ? <div className={toolbarClassName}>{toolbar}</div> : null}
            <div className={contentClassName}>{children}</div>
            {toolbar && toolbarPosition === "after-content" ? <div className={toolbarClassName}>{toolbar}</div> : null}
        </div>
    )
}

export default StatsLayout
