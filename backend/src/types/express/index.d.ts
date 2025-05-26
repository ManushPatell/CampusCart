import { UserPayload } from '../../types/user'; // Define your user type

declare global {
  namespace Express {
    interface Request {
      user?: UserPayload; // Make it optional in case it's not yet set
    }
  }
}
