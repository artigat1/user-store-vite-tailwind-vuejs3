export interface AuthenticatedUser {
    id: string,
    email: string;
    accessToken?: string,
    lastLoginAt?: string,
}