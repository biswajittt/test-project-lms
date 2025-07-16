import jwt from "jsonwebtoken";

function verifyToken(req, res, next) {
  const authHeader = req.headers.authorization;

  // Check if Authorization header is present
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ msg: "Authorization header missing or malformed" });
  }

  const token = authHeader.split(" ")[1];

  try {
    // Verify access token
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    // Attach user info to request (for further use in controllers or role middleware)
    req.user = {
      id: decoded.id,
      role: decoded.role,
    };

    next(); // proceed to next middleware or controller
  } catch (err) {
    return res.status(403).json({ msg: "Invalid or expired token" });
  }
}

export { verifyToken };
