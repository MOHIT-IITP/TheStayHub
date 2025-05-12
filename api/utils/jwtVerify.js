import dotenv from "dotenv";
import jwt from "jsonwebtoken";
const jwtsecret = process.env.JWT_SECRET;
dotenv.config();

export const generateJwtToken = async(user, res) => {
    try {
    jwt.sign(
    {
        email: user.email,
        id: user.id,
    },
    jwtsecret,
    {}, 
    (err, token)  => {
        if(err){
            return res.status(500).json({message: "token generation failed "});
        }
        res.cookie("token", token).json(user);
    }
    )
    } catch (error) {
    console.log("Error in generate jwt token");
    res.status(500).json({message: "Internal Server Error"})
    }
}

