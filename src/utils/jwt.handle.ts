<<<<<<< HEAD
import pkg from "jsonwebtoken";
const { sign, verify } = pkg;   //Importamos las funciones sign y verify de la librería jsonwebtoken
const JWT_SECRET = process.env.JWT_SECRET || "token.010101010101";

//No debemos pasar información sensible en el payload, en este caso vamos a pasar como parametro el ID del usuario
const generateToken = (id:string) => {
    const jwt = sign({id}, JWT_SECRET, {expiresIn: '20s'});
    return jwt;
};

const verifyToken = (jwt: string) => {
    const isOk = verify(jwt, JWT_SECRET);
    return isOk;

};

export { generateToken, verifyToken };
=======
import jwt from "jsonwebtoken";
import { IUser } from "../modules/users/user_models.js";
const { sign, verify } = jwt;   //Importamos las funciones sign y verify de la librería jsonwebtoken
const JWT_SECRET = process.env.JWT_SECRET || "joaquinrocaseminari7";

//No debemos pasar información sensible en el payload, en este caso vamos a pasar como parametro el ID del usuario
const generateToken = (id:string) => {
    const jwt = sign({id}, JWT_SECRET, {expiresIn: `2h`});
    return jwt;
};

function generateAccessToken(user:any,additionalData:any = {}){
    const payload = {email:user.email,name:user.name,age:user.age,role:"Admin",...additionalData};
    return jwt.sign(payload,process.env.SECRET_ACCESS_TOKEN!,{expiresIn:'15m'})
}

function generateRefreshToken(user:any){
    const payload = {email:user.email,name:user.name,age:user.age,role:"Admin"};
    return jwt.sign(payload,process.env.REFRESH_TOKEN_SECRET!,{expiresIn:'7d'})
}

const verifyToken = (jwt: string) => {
    const isOk = verify(jwt, JWT_SECRET);
    return isOk;
};

export { generateAccessToken,generateRefreshToken, verifyToken };
>>>>>>> a34ea80 (Exercici Seminari JWT)
