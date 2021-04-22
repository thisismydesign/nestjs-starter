export const jwtConstants = () => {
  return { secret: process.env.JWT_SECRET, expiresIn: '60m' };
};
