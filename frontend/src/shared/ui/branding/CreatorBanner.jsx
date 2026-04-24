import "./CreatorBanner.css"

function CreatorBanner() {
    return (
        <div className="shared-creator-banner">
            <div className="shared-creator-banner-info">
                <div className="shared-creator-banner-info-title">
                    <p>Contributors ---</p>
                    <h3>Created by Sebastian Torres</h3>
                </div>
                <p> This project was created by Sebastian Torres. You can view this project by clicking on the image. </p>
                <div className="shared-creator-banner-info-footer">
                    <p>Or you can also{' '}</p>
                    <a className="shared-creator-banner-link" href="https://github.com/Jughead6" target="_blank" rel="noreferrer">
                        click here
                    </a>
                    .
                </div>
            </div>
            <a href="https://github.com/Jughead6" target="_blank" rel="noreferrer" aria-label="Sebastian Torres GitHub profile">
                <img src="https://avatars.githubusercontent.com/u/97627021?v=4" alt="Sebastian Torres profile" />
            </a>
        </div>
    )
}

export default CreatorBanner
