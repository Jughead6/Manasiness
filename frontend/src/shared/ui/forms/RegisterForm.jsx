import './RegisterForm.css'

function RegisterForm({ onRegister }) {
    function handleSubmit(e) {
        e.preventDefault()
        const formData = new FormData(e.target)
        const data = Object.fromEntries(formData.entries())
        onRegister(data)
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
                <input id="tyc" type='checkbox' required />
                *I agree to the Terms and Conditions and Privacy policy
            </label>

            <button type='submit'>SignUp ⮕</button>
        </form>
    )
}

export default RegisterForm