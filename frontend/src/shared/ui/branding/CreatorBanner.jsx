import './CreatorBanner.css'

function CreatorBanner() {
    return (
        <div className="shared-creator-banner">
            <div className="shared-creator-banner-info">
                <h4>Contributors ---</h4>
                <h3>This project was created by Sebastián Torres. You can view this project publicly by clicking on the image.</h3>
                <h5>Or you can also click here</h5>
            </div>
            <img src="https://avatars.githubusercontent.com/u/97627021?v=4" alt="Sebastián Torres" />
        </div>
    )
}

export default CreatorBanner