import { AuthenticatedUser } from '@/models/AuthenticatedUser'
import { User } from '@/models/user'

export const state = {
    authenticatedUser: {} as AuthenticatedUser,
    isAuthenticated: false,
    users: [] as User[]
}

export type State = typeof state