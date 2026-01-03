import Logo from '@/components/template/Logo'
import Alert from '@/components/ui/Alert'
import SignInForm from './components/SignInForm'
import OauthSignIn from './components/OauthSignIn'
import ActionLink from '@/components/shared/ActionLink'
import useTimeOutMessage from '@/utils/hooks/useTimeOutMessage'
import { useThemeStore } from '@/store/themeStore'

type SignInProps = {
    signUpUrl?: string
    forgetPasswordUrl?: string
    disableSubmit?: boolean
}

export const SignInBase = ({
    signUpUrl = '/sign-up',
    forgetPasswordUrl = '/forgot-password',
    disableSubmit,
}: SignInProps) => {
    const [message, setMessage] = useTimeOutMessage()

    const mode = useThemeStore((state) => state.mode)

    return (
        <>
            <div className="mb-6">
                <Logo
                    type="full"
                    mode={mode}
                    imgClass="mx-auto"
                    logoWidth={140}
                />
            </div>
            <div className="mb-10">
                <h1 className="text-3xl font-bold mb-2">Sign In</h1>
                <p className="text-muted-foreground">
                    Welcome back! Please enter your credentials to access your
                    dashboard.
                </p>
            </div>
            {message && (
                <Alert showIcon className="mb-4" type="danger">
                    <span className="break-all">{message}</span>
                </Alert>
            )}
            <SignInForm
                disableSubmit={disableSubmit}
                setMessage={setMessage}
                passwordHint={
                    <div className="mb-6 mt-2 text-right">
                        <ActionLink
                            to={forgetPasswordUrl}
                            className="text-sm font-medium text-primary hover:underline"
                            themeColor={false}
                        >
                            Forgot password?
                        </ActionLink>
                    </div>
                }
            />
            {/* 
            <div className="mt-8">
                <div className="flex items-center gap-2 mb-6">
                    <div className="border-t border-gray-200 dark:border-gray-800 flex-1 mt-[1px]" />
                    <p className="font-semibold text-xs uppercase text-muted-foreground px-2">
                        or continue with
                    </p>
                    <div className="border-t border-gray-200 dark:border-gray-800 flex-1 mt-[1px]" />
                </div>
                <OauthSignIn
                    disableSubmit={disableSubmit}
                    setMessage={setMessage}
                />
            </div>
            <div>
                <div className="mt-8 text-center text-sm">
                    <span className="text-muted-foreground">{`Don't have an account yet?`} </span>
                    <ActionLink
                        to={signUpUrl}
                        className="text-primary font-bold hover:underline"
                        themeColor={false}
                    >
                        Sign up
                    </ActionLink>
                </div>
            </div>
            */}
        </>
    )
}

const SignIn = () => {
    return <SignInBase />
}

export default SignIn
