import { loginStore, registerStore } from "./auth.service.js"

export async function login(req, res, next) {
    const { email, password } = req.body

    try {
        if (!email || !password) {
            return res.status(400).json({ error: "Email and password are required"})
        }

        const store = await loginStore(email, password)

        if(!store) {
            return res.status(401).json({ error: "Invalid credentials" })
        }

        res.status(200).json({
            message: "Login successful",
            token: store.token,
            store: store.store
        })
    } catch (error) {
        next(error)
    }
}

export async function register(req, res, next) {
    const {name, email, password, repassword, phone,  image, } = req.body

    try {
        const cleanImage = image || "https://i.postimg.cc/DzKtGYCx/nouserphoto.png"

        if (!name || !email || !password || !repassword) {
            return res.status(400).json({error: "Complete the entire form"})
        }

        if (password !== repassword) {
            return res.status(400).json({error: "The passwords are different"})
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            return res.status(400).json({error: "Email invalid"})
        }

        if (phone && !/^9\d{9}$/.test(phone)) {
            return res.status(400).json({ error: "Phone must start with 9 and have 9 digits" })
        }

        const store = await registerStore({
            name,
            email, 
            password, 
            phone: cleanPhone, 
            image: cleanImage
        })

        if(!store) {
            return res.status(401).json({error: "Verify that your credentials are unique"})
        }

        res.status(201).json({
            message: "Register successfull",
            store
        })
    } catch (error) {
        next(error)
    }
}