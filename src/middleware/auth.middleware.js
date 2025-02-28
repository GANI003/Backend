import { asyncHandler } from "../utils/asynchandler.js";
import jwt from "jsonwebtoken";
import { Usercreation } from "../models/usersCreation.models.js";
import { Folder } from "../models/folders.models.js";

export const jwtVerify = asyncHandler(async (req, res, next) => {
    try {
        const token = req.cookies.accessToken || req.header("Cookie");

        if (!token) {
            return res.status(401).json({ msg: "Unauthorized: No token provided" });
        }

        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        const user = await Usercreation.findById(decodedToken?._id).select("-password -refreshToken");

        console.log("Tokens : ", decodedToken);

        if (!user) {
            return res.status(401).json({ msg: "Invalid Token: User not found" });
        }

        req.user = user;

        next();
    } catch (error) {
        console.error("JWT Verification Error: ", error);
        return res.status(401).json({ msg: "Invalid access token" });
    }
});
