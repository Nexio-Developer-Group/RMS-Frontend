export type SignInCredential = {
    email: string
    password: string
}

export type SignInResponse = {
    access_token: string
    user: {
        id: string
        name: string
        email: string
        role: string
        tenant_id: string
        tenant?: {
            tenant_id: string
            parent_id: string | null
            type: string
            name: string
            code: string
            address: string
            phone: string
            email: string
            logo: string | null
            tagline: string | null
            status: string
            timezone: string
            locales: string
            module_list: string
        }
    }
    permissions: string[]
}

export type SignUpResponse = SignInResponse

export type SignUpCredential = {
    userName: string
    email: string
    password: string
}

export type ForgotPassword = {
    email: string
}

export type ResetPassword = {
    password: string
}

export type AuthRequestStatus = 'success' | 'failed' | ''

export type AuthResult = Promise<{
    status: AuthRequestStatus
    message: string
}>

export type User = {
    userId?: string | null
    avatar?: string | null
    name?: string | null
    email?: string | null
    authority?: string[]
    permissions?: string[]
}

export type Token = {
    accessToken: string
    refreshToken?: string
}

export type OauthSignInCallbackPayload = {
    onSignIn: (tokens: Token, user?: User, permissions?: string[]) => void
    redirect: () => void
}
