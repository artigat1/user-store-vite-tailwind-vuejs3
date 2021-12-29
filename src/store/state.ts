import { AuthenticatedUser } from '@/models/authenticated-user'

export const state = {
    user: {} as AuthenticatedUser,
    isAuthenticated: false,
}

export type State = typeof state