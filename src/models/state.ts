import { AuthenticatedUser } from '@/models/authenticated-user'

export interface State {
    user?: AuthenticatedUser,
    isAuthenticated: boolean,
}