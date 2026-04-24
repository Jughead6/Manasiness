import { useState } from "react"
import { Link } from "react-router-dom"
import "./RegisterForm.css"
import PhoneInput from "./PhoneInput.jsx"

const STEPS = {
    EMAIL: 1,
    CODE: 2,
    DETAILS: 3
}

const codeIndexes = [0, 1, 2, 3, 4, 5]
const stepLabels = ["Email", "Code", "Store"]

function RegisterForm({ onSubmit, onRegister, onVerifyEmail, onVerifyCode }) {
    const handleRegister = onSubmit || onRegister
    const [step, setStep] = useState(STEPS.EMAIL)
    const [email, setEmail] = useState("")
    const [code, setCode] = useState(["", "", "", "", "", ""])
    const [emailLoading, setEmailLoading] = useState(false)
    const [codeLoading, setCodeLoading] = useState(false)
    const [codeError, setCodeError] = useState(false)
    const [emailError, setEmailError] = useState("")

    async function handleSendEmail(e) {
        e.preventDefault()
        if (!email || emailLoading) return

        try {
            setEmailLoading(true)
            setEmailError("")
            await onVerifyEmail({ email })
            setStep(STEPS.CODE)
        } catch (error) {
            setEmailError(error.message || "Email could not be verified")
        } finally {
            setEmailLoading(false)
        }
    }

    async function handleVerifyCode(e) {
        e.preventDefault()
        const fullCode = code.join("")

        if (fullCode.length < 6 || codeLoading) return

        try {
            setCodeLoading(true)
            setCodeError(false)
            await onVerifyCode({ email, code: fullCode })
            setStep(STEPS.DETAILS)
        } catch {
            setCodeError(true)
        } finally {
            setCodeLoading(false)
        }
    }

    function handleSubmit(e) {
        e.preventDefault()
        const formData = new FormData(e.target)
        const data = Object.fromEntries(formData.entries())
        handleRegister({ ...data, email, code: code.join("") })
    }

    function handleCodeChange(value, index) {
        if (!/^\d*$/.test(value)) return

        const next = [...code]
        next[index] = value.slice(-1)
        setCode(next)
        setCodeError(false)

        if (value && index < 5) {
            document.getElementById(`code-box-${index + 1}`)?.focus()
        }
    }

    function handleCodeKeyDown(e, index) {
        if (e.key === "Backspace" && !code[index] && index > 0) {
            document.getElementById(`code-box-${index - 1}`)?.focus()
        }
    }

    function handleCodePaste(e) {
        const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6)

        if (pasted.length !== 6) return

        setCode(pasted.split(""))
        setCodeError(false)
        document.getElementById("code-box-5")?.focus()
    }

    return (
        <div className="shared-register-form-panel">
            <div className="shared-register-form-header">
                <h1>Register Now</h1>
            </div>

            <div className="shared-register-form-steps">
                {stepLabels.map((label, index) => {
                    const number = index + 1
                    const isActive = step === number
                    const isDone = step > number

                    return (
                        <div key={label} className="shared-register-form-step-item">
                            <div className={`shared-register-form-step-circle ${isActive ? "active" : ""} ${isDone ? "done" : ""}`}>{isDone ? "✓" : number}</div>
                            <span className={`shared-register-form-step-label ${isActive ? "active" : ""} ${isDone ? "done" : ""}`}>{label}</span>
                            {index < stepLabels.length - 1 ? <div className={`shared-register-form-step-line ${isDone ? "done" : ""}`}></div> : null}
                        </div>
                    )
                })}
            </div>

            {step === STEPS.EMAIL && (
                <form className="shared-register-form-section" onSubmit={handleSendEmail}>
                    <div className="shared-register-form-copy">
                        <h2>Enter email</h2>
                        <p>Use the email that will own this store account.</p>
                    </div>
                    <div className="shared-register-form-field full">
                        <label htmlFor="register-email">Email</label>
                        <input id="register-email" type="email" placeholder="store@email.com" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" required autoFocus />
                    </div>
                    {emailError ? <p className="shared-register-form-error">{emailError}</p> : null}
                    <button type="submit" className="shared-register-form-primary-button" disabled={emailLoading}>{emailLoading ? <span className="shared-register-form-spinner"></span> : "Send code"}</button>
                    <div className="shared-register-form-footer"><span>Already have an account?</span><Link to="/login">Login</Link></div>
                </form>
            )}

            {step === STEPS.CODE && (
                <form className="shared-register-form-section" onSubmit={handleVerifyCode}>
                    <div className="shared-register-form-copy">
                        <h2>Enter the code</h2>
                        <p>We sent a 6-digit code to <strong>{email}</strong>.</p>
                    </div>
                    <div className="shared-register-form-code-boxes" onPaste={handleCodePaste}>
                        {codeIndexes.map((index) => <input key={index} id={`code-box-${index}`} className={`shared-register-form-code-box ${codeError ? "error" : ""}`} type="text" inputMode="numeric" maxLength={1} value={code[index]} onChange={(e) => handleCodeChange(e.target.value, index)} onKeyDown={(e) => handleCodeKeyDown(e, index)} autoFocus={index === 0} />)}
                    </div>
                    {codeError ? <p className="shared-register-form-error">Invalid code</p> : null}
                    <button type="submit" className="shared-register-form-primary-button" disabled={codeLoading || code.join("").length < 6}>{codeLoading ? <span className="shared-register-form-spinner"></span> : "Verify code"}</button>
                    <button type="button" className="shared-register-form-secondary-button" onClick={() => setStep(STEPS.EMAIL)}>Use another email</button>
                </form>
            )}

            {step === STEPS.DETAILS && (
                <form id="shared-register-form" className="shared-register-form-section" onSubmit={handleSubmit}>
                    <div className="shared-register-form-copy">
                        <h2>Store details</h2>
                        <p>Finish the main information for your workspace.</p>
                    </div>
                    <div className="shared-register-form-grid">
                        <div className="shared-register-form-field full"><label htmlFor="register-name">Store name</label><input id="register-name" name="name" placeholder="My store" autoComplete="organization" required /></div>
                        <div className="shared-register-form-field full"><label htmlFor="register-email-readonly">Email</label><input id="register-email-readonly" type="email" value={email} disabled /></div>
                        <div className="shared-register-form-field full"><label htmlFor="register-phone">Phone</label><PhoneInput id="register-phone" name="phone" /></div>
                        <div className="shared-register-form-field"><label htmlFor="register-image">Image URL</label><input id="register-image" name="image" type="url" placeholder="https://..." /></div>
                        <div className="shared-register-form-field"><label htmlFor="register-password">Password</label><input id="register-password" name="password" type="password" placeholder="Your password" autoComplete="new-password" minLength={8} required /></div>
                        <div className="shared-register-form-field"><label htmlFor="register-repassword">Repeat password</label><input id="register-repassword" name="repassword" type="password" placeholder="Repeat password" autoComplete="new-password" minLength={8} required /></div>
                    </div>
                    <label className="shared-register-form-check"><input id="tyc" name="terms" type="checkbox" value="accepted" required /><span>I agree to the <a href="/terms">Terms</a> and <a href="/privacy">Privacy Policy</a></span></label>
                    <button type="submit" className="shared-register-form-primary-button">Create account</button>
                    <button type="button" className="shared-register-form-secondary-button" onClick={() => setStep(STEPS.CODE)}>Back to code</button>
                </form>
            )}
        </div>
    )
}

export default RegisterForm
