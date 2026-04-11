import './RegisterForm.css'

function RegisterForm({ onSubmit, onRegister }) {
    const handleRegister = onSubmit || onRegister

    function handleSubmit(e) {
        e.preventDefault()
        const formData = new FormData(e.target)
        const data = Object.fromEntries(formData.entries())
        handleRegister(data)
    }

    return (
        <form id="shared-register-form" onSubmit={handleSubmit}>
            <h2>Register here!</h2>

            <div id="shared-register-form-fields">
                <input name="name" placeholder='*Name of the store/company' required />
                <input name="email" type="email" placeholder='*@email' required />
                <input name="phone" placeholder='Phone number' />
                <input name="image" placeholder='Profile Image' />
                <input name="password" type="password" placeholder='*Password' required />
                <input name="repassword" type="password" placeholder='*Repeat Password' required />
            </div>

            <label htmlFor='tyc'>
                <input id="tyc" name="terms" type='checkbox' value="accepted" required />
                *I agree to the Terms and Conditions and Privacy policy
            </label>

            <button type='submit'>Sign Up ⮕</button>
        </form>
    )
}

export default RegisterForm
