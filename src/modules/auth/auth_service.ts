import { encrypt, verified } from "../../utils/bcrypt.handle.js";
<<<<<<< HEAD
import { generateToken } from "../../utils/jwt.handle.js";
=======
import { generateAccessToken,generateRefreshToken } from "../../utils/jwt.handle.js";
>>>>>>> a34ea80 (Exercici Seminari JWT)
import User, { IUser } from "../users/user_models.js";
import { Auth } from "./auth_model.js";
import jwt from 'jsonwebtoken';
import axios from 'axios';
<<<<<<< HEAD
=======
import { use } from "passport";

>>>>>>> a34ea80 (Exercici Seminari JWT)

const registerNewUser = async ({ email, password, name, age }: IUser) => {
    const checkIs = await User.findOne({ email });
    if(checkIs) return "ALREADY_USER";
    const passHash = await encrypt(password);
    const registerNewUser = await User.create({ 
        email, 
        password: passHash, 
        name, 
        age });
    return registerNewUser;
};

const loginUser = async ({ email, password }: Auth) => {
<<<<<<< HEAD
    const checkIs = await User.findOne({ email });
    if(!checkIs) return "NOT_FOUND_USER";

    const passwordHash = checkIs.password; //El encriptado que ve de la bbdd
    const isCorrect = await verified(password, passwordHash);
    if(!isCorrect) return "INCORRECT_PASSWORD";

    const token = generateToken(checkIs.email);
    const data = {
        token,
        user: checkIs
=======
    const user = await User.findOne({ email });
    if(!user) return "NOT_FOUND_USER";

    const passwordHash = user.password; //El encriptado que ve de la bbdd
    const isCorrect = await verified(password, passwordHash);
    if(!isCorrect) return "INCORRECT_PASSWORD";

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user)
    const data = {
        token: accessToken,
        reftoken:refreshToken,
        user: user
>>>>>>> a34ea80 (Exercici Seminari JWT)
    }
    return data;
};

<<<<<<< HEAD
=======


>>>>>>> a34ea80 (Exercici Seminari JWT)
const googleAuth = async (code: string) => {

    try {
        console.log("Client ID:", process.env.GOOGLE_CLIENT_ID);
        console.log("Client Secret:", process.env.GOOGLE_CLIENT_SECRET);
        console.log("Redirect URI:", process.env.GOOGLE_OAUTH_REDIRECT_URL);
    
        if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET || !process.env.GOOGLE_OAUTH_REDIRECT_URL) {
            throw new Error("Variables de entorno faltantes");
        }

        interface TokenResponse {
            access_token: string;
            expires_in: number;
            scope: string;
            token_type: string;
            id_token?: string;
        }
        //axios --> llibreria que s'utilitza per a fer peticions HTTP
        const tokenResponse = await axios.post<TokenResponse>('https://oauth2.googleapis.com/token', {
            code,
            client_id: process.env.GOOGLE_CLIENT_ID,
            client_secret: process.env.GOOGLE_CLIENT_SECRET,
            redirect_uri: process.env.GOOGLE_OAUTH_REDIRECT_URL,
            grant_type: 'authorization_code'
        });

        const access_token = tokenResponse.data.access_token;
        console.log("Access Token:", access_token); 
        // Obté el perfil d'usuari
        const profileResponse = await axios.get('https://www.googleapis.com/oauth2/v1/userinfo', {
            params: { access_token},
            headers: { Accept: 'application/json',},
            
        });

        const profile = profileResponse.data as {name:string, email: string; id: string };
        console.log("Access profile:", profile); 
<<<<<<< HEAD
        // Busca o crea el perfil a la BBDD
        let user = await User.findOne({ 
            $or: [{name: profile.name},{ email: profile.email }, { googleId: profile.id }] 
=======

        if(!profile.email){
            throw new Error("Perfil de Google no posee un correo electronico válido");
        }

        // Busca o crea el perfil a la BBDD
        let user = await User.findOne({ 
            $or: [{ email: profile.email }, { googleId: profile.id }] 
>>>>>>> a34ea80 (Exercici Seminari JWT)
        });

        if (!user) {
            const randomPassword = Math.random().toString(36).slice(-8);
            const passHash = await encrypt(randomPassword);
            user = await User.create({
                name: profile.name,
                email: profile.email,
                googleId: profile.id,
                password: passHash,
            });
        }

        // Genera el token JWT
<<<<<<< HEAD
        const token = generateToken(user.email);

        console.log(token);
        return { token, user };

=======
        const accessToken = generateAccessToken(user);
        const refreshToken = generateRefreshToken(user)

        return { accessToken: accessToken,refreshToken: refreshToken,user};
>>>>>>> a34ea80 (Exercici Seminari JWT)
    } catch (error: any) {
        console.error('Google Auth Error:', error.response?.data || error.message); // Log detallado
        throw new Error('Error en autenticación con Google');
    }
};


export { registerNewUser, loginUser, googleAuth };