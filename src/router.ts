// // api route
import { usersRouter } from './apis/user.api';
import { authRouter } from './apis/auth.api';

export default (app: any) => {
    const prefix = '/api';
    app.use(`${prefix}/auth`, authRouter);
    app.use(`${prefix}/users`, usersRouter);
}