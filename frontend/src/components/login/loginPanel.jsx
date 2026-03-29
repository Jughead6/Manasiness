import { useState } from 'react'
import './loginPanel.css'
import banner from '../../assets/public/banner.png'

function LoginPanel() {
    const [loginCodeFocus, setLoginCodeFocus] = useState(false)

    return (
        <div id="loginPanel">

            <div id="loginTopSection">
                <div id="loginBannerContainer">
                    <img id="loginBanner" src={banner} alt="banner" />
                </div>
                <div id="loginDividerBand" />
            </div>

            <div id="loginBottomSection">
                <div id="loginFormContainer">
                    <div id="loginFormCard">

                        <div id="loginMonkeyContainer" className={loginCodeFocus ? 'loginMonkeyCover' : ''}>
                            <div id="loginMonkeyFace">
                                <div className="loginMonkeyEar loginMonkeyEarLeft" />
                                <div className="loginMonkeyEar loginMonkeyEarRight" />
                                <div id="loginMonkeyInnerFace">
                                    <div id="loginMonkeyHair" />
                                    <div id="loginMonkeyEyes">
                                        <span className="loginMonkeyEye" />
                                        <span className="loginMonkeyEye" />
                                    </div>
                                    <div id="loginMonkeyNose" />
                                    <div id="loginMonkeyMouth" />
                                </div>
                                <div id="loginMonkeyHands">
                                    <span className="loginMonkeyHand loginMonkeyHandLeft" />
                                    <span className="loginMonkeyHand loginMonkeyHandRight" />
                                </div>
                            </div>
                        </div>

                        <h1 id="loginTitle">Welcome to Manasiness</h1>
                        <h2 id="loginSubtitle">Enter your access code</h2>

                        <form id="loginForm" action="/enviar" method="post">
                            <label id="loginLabel" htmlFor="loginInput">Code</label>
                            <input
                                id="loginInput"
                                type="text"
                                placeholder="Enter your code"
                                onFocus={() => setLoginCodeFocus(true)}
                                onBlur={() => setLoginCodeFocus(false)}
                            />
                            <button id="loginButton" type="submit">Log in</button>
                        </form>

                    </div>
                </div>
            </div>

        </div>
    )
}

export default LoginPanel