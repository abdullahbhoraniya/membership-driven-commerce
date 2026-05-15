import dotenv from "dotenv";
import AppError from "./AppError.js";

dotenv.config();

if(!process.env.PORT){
    throw new AppError("PORT is not defined in .env file",404);
}

if(!process.env.MONGODB_URL){
    throw new AppError("MONGODB_URL is not defined in .env file",404);
}

if(!process.env.jwt_secret){
    throw new AppError("Jwt secret not found",404);
}

if(!process.env.GOOGLE_OAUTH_REFRESH_TOKEN){
    throw new AppError("Auth refresh token not found",404);
    console.log("refrsh token",process.env.GOOGLE_OAUTH_REFRESH_TOKEN)
}
if(!process.env.GOOGLE_SMTP_SERVER_SECRET_ID){
    throw new AppError("Secret id not founcd",404);
    console.log("Server client id")
}
if(!process.env.GOOGLE_SMTP_SERVER_CLIENT_ID){
    throw new AppError("CLient ID not found",404);
}
if(!process.env.GOOGLE_USER){
    throw new AppError("User email not found");
}
if(!process.env.RAZORPAY_TEST_KEY_ID){
    throw new AppError("razropay id not found",404)
}

if(!process.env.RAZORPAY_TEST_KEY_SECRET){
    throw new AppError("razropay secret not found",404)
}

export const config={
    port:process.env.PORT,
    mongo_url:process.env.MONGODB_URL,
    jwtSecret:process.env.jwt_secret,
    googleClientId:process.env.GOOGLE_SMTP_SERVER_CLIENT_ID,
    googleSecretId:process.env.GOOGLE_SMTP_SERVER_SECRET_ID,
    oauthRefreshToken:process.env.GOOGLE_OAUTH_REFRESH_TOKEN,
    googleUser:process.env.GOOGLE_USER,
    razorpay_key_id:process.env.RAZORPAY_TEST_KEY_ID,
    razorpay_key_secret:process.env.RAZORPAY_TEST_KEY_SECRET,
    oauthaccesstoken:process.env.GOOGLE_OAUTH_REFRESH_TOKEN
}
