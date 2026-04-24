import { useState } from "react"
import { Link } from "react-router-dom"
import "./ForgotPasswordForm.css"

const STEPS = {
    EMAIL: 1,
    CODE: 2,
    PASSWORD: 3
}

const codeIndexes = [0, 1, 2, 3, 4, 5]
const stepLabels = ["Email", "Code", "Password"]

function ForgotPasswordForm({ onSendCode, onVerifyCode, onResetPassword }) {
    const [step, setStep] = useState(STEPS.EMAIL)
    const [email, setEmail] = useState("")
    const [code, setCode] = useState(["", "", "", "", "", ""])
    const [isEmailLoading, setIsEmailLoading] = useState(false)
    const [isCodeLoading, setIsCodeLoading] = useState(false)
    const [isPasswordLoading, setIsPasswordLoading] = useState(false)
    const [emailError, setEmailError] = useState("")
    const [codeError, setCodeError] = useState(false)
    const [passwordError, setPasswordError] = useState("")

    async function handleSendCode(e) {
        e.preventDefault()
        if (!email || isEmailLoading) return

        try {
            setIsEmailLoading(true)
            setEmailError("")
            await onSendCode({ email })
            setStep(STEPS.CODE)
        } catch (error) {
            setEmailError(error.message || "Email could not be verified")
        } finally {
            setIsEmailLoading(false)
        }
    }

    async function handleVerifyCode(e) {
        e.preventDefault()
        const fullCode = code.join("")

        if (fullCode.length < 6 || isCodeLoading) return

        try {
            setIsCodeLoading(true)
            setCodeError(false)
            await onVerifyCode({ email, code: fullCode })
            setStep(STEPS.PASSWORD)
        } catch {
            setCodeError(true)
        } finally {
            setIsCodeLoading(false)
        }
    }

    async function handleResetPassword(e) {
        e.preventDefault()
        const formData = new FormData(e.target)
        const data = Object.fromEntries(formData.entries())

        if (data.password !== data.repassword) {
            setPasswordError("Passwords do not match")
            return
        }

        try {
            setIsPasswordLoading(true)
            setPasswordError("")
            await onResetPassword({ ...data, email, code: code.join("") })
        } catch (error) {
            setPasswordError(error.message || "Password could not be reset")
        } finally {
            setIsPasswordLoading(false)
        }
    }

    function handleCodeChange(value, index) {
        if (!/^\d*$/.test(value)) return

        const next = [...code]
        next[index] = value.slice(-1)

        setCode(next)
        setCodeError(false)

        if (value && index < 5) {
            document.getElementById(`forgot-code-box-${index + 1}`)?.focus()
        }
    }

    function handleCodeKeyDown(e, index) {
        if (e.key === "Backspace" && !code[index] && index > 0) {
            document.getElementById(`forgot-code-box-${index - 1}`)?.focus()
        }
    }

    function handleCodePaste(e) {
        const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6)

        if (pasted.length !== 6) return

        setCode(pasted.split(""))
        setCodeError(false)
        document.getElementById("forgot-code-box-5")?.focus()
    }

    return (
        <div className="shared-forgot-password-form-panel">
            <div className="shared-forgot-password-form-header">
                <h1>Reset Password</h1>
                <span>Recover access to your store account.</span>
            </div>

            <div className="shared-forgot-password-form-steps">
                {stepLabels.map((label, index) => {
                    const number = index + 1
                    const isActive = step === number
                    const isDone = step > number

                    return (
                        <div key={label} className="shared-forgot-password-form-step-item">
                            <div className={`shared-forgot-password-form-step-circle ${isActive ? "active" : ""} ${isDone ? "done" : ""}`}>{isDone ? "✓" : number}</div>
                            <span className={`shared-forgot-password-form-step-label ${isActive ? "active" : ""} ${isDone ? "done" : ""}`}>{label}</span>
                            {index < stepLabels.length - 1 ? <div className={`shared-forgot-password-form-step-line ${isDone ? "done" : ""}`}></div> : null}
                        </div>
                    )
                })}
            </div>

            {step === STEPS.EMAIL && (
                <form className="shared-forgot-password-form-section" onSubmit={handleSendCode}>
                    <div className="shared-forgot-password-form-copy">
                        <h2>Enter your email</h2>
                        <p>We will send a 6-digit code if the store account exists.</p>
                    </div>
                    <div className="shared-forgot-password-form-field full">
                        <label htmlFor="forgot-email">Email</label>
                        <input id="forgot-email" type="email" placeholder="store@email.com" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" required autoFocus />
                    </div>
                    {emailError ? <p className="shared-forgot-password-form-error">{emailError}</p> : null}
                    <button type="submit" className="shared-forgot-password-form-primary-button" disabled={isEmailLoading}>{isEmailLoading ? <span className="shared-forgot-password-form-spinner"></span> : "Send code"}</button>
                    <div className="shared-forgot-password-form-footer"><span>Remember your password?</span><Link to="/login">Login</Link></div>
                </form>
            )}

            {step === STEPS.CODE && (
                <form className="shared-forgot-password-form-section" onSubmit={handleVerifyCode}>
                    <div className="shared-forgot-password-form-copy">
                        <h2>Enter the code</h2>
                        <p>We sent a 6-digit code to <strong>{email}</strong>.</p>
                    </div>
                    <div className="shared-forgot-password-form-code-boxes" onPaste={handleCodePaste}>
                        {codeIndexes.map((index) => <input key={index} id={`forgot-code-box-${index}`} className={`shared-forgot-password-form-code-box ${codeError ? "error" : ""}`} type="text" inputMode="numeric" maxLength={1} value={code[index]} onChange={(e) => handleCodeChange(e.target.value, index)} onKeyDown={(e) => handleCodeKeyDown(e, index)} autoFocus={index === 0} />)}
                    </div>
                    {codeError ? <p className="shared-forgot-password-form-error">Invalid code</p> : null}
                    <button type="submit" className="shared-forgot-password-form-primary-button" disabled={isCodeLoading || code.join("").length < 6}>{isCodeLoading ? <span className="shared-forgot-password-form-spinner"></span> : "Verify code"}</button>
                    <button type="button" className="shared-forgot-password-form-secondary-button" onClick={() => setStep(STEPS.EMAIL)}>Use another email</button>
                </form>
            )}

            {step === STEPS.PASSWORD && (
                <form className="shared-forgot-password-form-section" onSubmit={handleResetPassword}>
                    <div className="shared-forgot-password-form-copy">
                        <h2>New password</h2>
                        <p>Create a stronger password for this account.</p>
                    </div>
                    <div className="shared-forgot-password-form-grid">
                        <div className="shared-forgot-password-form-field full"><label htmlFor="forgot-password">Password</label><input id="forgot-password" name="password" type="password" placeholder="New password" autoComplete="new-password" minLength={8} required /></div>
                        <div className="shared-forgot-password-form-field full"><label htmlFor="forgot-repassword">Repeat password</label><input id="forgot-repassword" name="repassword" type="password" placeholder="Repeat password" autoComplete="new-password" minLength={8} required /></div>
                    </div>
                    {passwordError ? <p className="shared-forgot-password-form-error">{passwordError}</p> : null}
                    <button type="submit" className="shared-forgot-password-form-primary-button" disabled={isPasswordLoading}>{isPasswordLoading ? <span className="shared-forgot-password-form-spinner"></span> : "Reset password"}</button>
                    <button type="button" className="shared-forgot-password-form-secondary-button" onClick={() => setStep(STEPS.CODE)}>Back to code</button>
                </form>
            )}
        </div>
    )
}

export default ForgotPasswordForm
