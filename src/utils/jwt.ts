import { jwtDecode } from "jwt-decode";

interface JwtPayload {
  userId?: string | number;
  sub?: string;
  id?: string | number;
}

export const getUserIdFromToken = (token: string): string | null => {
  try {
    const decoded = jwtDecode<JwtPayload>(token);

    return (
      (decoded.userId && decoded.userId.toString()) ||
      (decoded.sub && decoded.sub.toString()) ||
      (decoded.id && decoded.id.toString()) ||
      null
    );
  } catch (error) {
    console.log("Decode JWT error:", error);
    return null;
  }
};
