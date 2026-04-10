import './registerForm.css'

function RegisterForm() {
    return (
        <form id="register-form">
            <h2>Register here!</h2>
            <div id="register-inputs">
                <input placeholder='*Name of the store/company' required />
                <input type="email" placeholder='*@email' required />
                <input placeholder='*Phone number' required />
                <input placeholder='*Profile Image'/>
                <input type="password" placeholder='*Password' required/>
                <input type="password" placeholder='*Repeat Password' required />
            </div>
            <label htmlFor='tyc'><input type='checkbox' required />*I agree to the Terms and Conditions and Privacy policy</label>
            <button type='submit'>SignUp ⮕</button>
        </form>
    )
}

export default RegisterForm