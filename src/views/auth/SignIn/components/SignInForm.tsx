import { useState } from 'react'
import { Input } from '@/components/shadcn/ui/input'
import { Button } from '@/components/shadcn/ui/button'
import { Label } from '@/components/shadcn/ui/label'
import { useAuth } from '@/auth'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import type { ZodType } from 'zod'
import type { CommonProps } from '@/@types/common'
import type { ReactNode } from 'react'
import { Eye, EyeOff } from 'lucide-react'

interface SignInFormProps extends CommonProps {
    disableSubmit?: boolean
    passwordHint?: string | ReactNode
    setMessage?: (message: string) => void
}

type SignInFormSchema = {
    email: string
    password: string
}

const validationSchema: ZodType<SignInFormSchema> = z.object({
    email: z
        .string({ required_error: 'Please enter your email' })
        .email({ message: 'Invalid email address' })
        .min(1, { message: 'Please enter your email' }),
    password: z
        .string({ required_error: 'Please enter your password' })
        .min(1, { message: 'Please enter your password' }),
})

const SignInForm = (props: SignInFormProps) => {
    const [isSubmitting, setSubmitting] = useState<boolean>(false)
    const [showPassword, setShowPassword] = useState<boolean>(false)

    const { disableSubmit = false, className, setMessage, passwordHint } = props

    const {
        handleSubmit,
        formState: { errors },
        control,
    } = useForm<SignInFormSchema>({
        defaultValues: {
            email: 'tenant@test.com',
            password: 'password',
        },
        resolver: zodResolver(validationSchema),
    })

    const { signIn } = useAuth()

    const onSignIn = async (values: SignInFormSchema) => {
        const { email, password } = values

        if (!disableSubmit) {
            setSubmitting(true)

            const result = await signIn({ email, password })

            if (result?.status === 'failed') {
                setMessage?.(result.message)
            }
        }

        setSubmitting(false)
    }

    return (
        <div className={className}>
            <form onSubmit={handleSubmit(onSignIn)} className="space-y-6">
                <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Controller
                        name="email"
                        control={control}
                        render={({ field }) => (
                            <Input
                                id="email"
                                type="email"
                                placeholder="name@example.com"
                                autoComplete="email"
                                className={
                                    errors.email
                                        ? 'border-destructive focus-visible:ring-destructive'
                                        : ''
                                }
                                {...field}
                            />
                        )}
                    />
                    {errors.email && (
                        <p className="text-xs font-medium text-destructive">
                            {errors.email.message}
                        </p>
                    )}
                </div>
                <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <div className="relative">
                        <Controller
                            name="password"
                            control={control}
                            render={({ field }) => (
                                <Input
                                    id="password"
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="••••••••"
                                    autoComplete="current-password"
                                    className={
                                        errors.password
                                            ? 'border-destructive focus-visible:ring-destructive pr-10'
                                            : 'pr-10'
                                    }
                                    {...field}
                                />
                            )}
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                        >
                            {showPassword ? (
                                <EyeOff size={18} />
                            ) : (
                                <Eye size={18} />
                            )}
                        </button>
                    </div>
                    {errors.password && (
                        <p className="text-xs font-medium text-destructive">
                            {errors.password.message}
                        </p>
                    )}
                </div>

                {passwordHint}

                <Button
                    className="w-full"
                    disabled={isSubmitting || disableSubmit}
                    type="submit"
                >
                    {isSubmitting ? 'Signing in...' : 'Sign In'}
                </Button>
            </form>
        </div>
    )
}

export default SignInForm
