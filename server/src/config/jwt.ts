import { Secret, SignOptions } from "jsonwebtoken";

export const jwtConfig: {
  secret: Secret;
  expiresIn: SignOptions["expiresIn"];
} = {
  secret: process.env.JWT_SECRET ? process.env.JWT_SECRET : "secret",
  expiresIn: (process.env.JWT_EXPIRES_IN
    ? process.env.JWT_EXPIRES_IN
    : "1h") as SignOptions["expiresIn"],
};
