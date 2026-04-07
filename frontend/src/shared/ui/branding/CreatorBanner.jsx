import "./CreatorBanner.css"

function CreatorBanner() {
    return (
        <div className="shared-creator-banner">
            <div className="shared-creator-banner-info">
                <p className="shared-creator-banner-label">Contributors ---</p>
                <h3>Created by Sebastian Torres</h3>
                <p>This project was created by Sebastian Torres. You can view this project by clicking on the image.</p>
                <p>Or you can also click here.</p>
            </div>
            <img src="https://avatars.githubusercontent.com/u/97627021?v=4" alt="Sebastian Torres profile" />
        </div>
    )
}

export default CreatorBanner
