import jwt from "jsonwebtoken";

function generateAccessToken(user) {
  return jwt.sign(
    { id: user._id, role: user.role },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "3d" } // Short-lived access token
  );
}

function generateRefreshToken(user) {
  return jwt.sign(
    { id: user._id },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: "7d" } // Long-lived refresh token
  );
}

export { generateAccessToken, generateRefreshToken };
