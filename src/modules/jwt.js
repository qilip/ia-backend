import jwt from 'jsonwebtoken';
// import cuid from 'cuid';

const JWT_SECRET = process.env.JWT_SECRET;

export const sign = (subject, payload, expiresIn) => {
  return new Promise(
      (resolve, reject) => {
        jwt.sign(
          payload,
          JWT_SECRET,
          {
            algorithm: 'HS256',
            issuer: 'iA',
            subject: subject,
            // audience: <- 유저별 고유 값?,
            // jwtid: cuid(),
            expiresIn: expiresIn,
          }, (error, token) => {
            if (error) reject(error);
            else resolve(token);
          }
        );
      }
    );
};

export const verify = (subject, token) => {
  return new Promise(
    (resolve, reject) => {
      jwt.verify(
        token,
        JWT_SECRET,
        {
          algorithm: ['HS256'],
          issuer: 'iA',
          subject: subject,
        }, (error, decoded) => {
          if(error) reject(error);
          else resolve(decoded);
        }
      );
    }
  );
};
