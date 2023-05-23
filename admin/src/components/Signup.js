import { useForm } from "react-hook-form";
import { useRef, useState } from "react";
import { toast } from 'react-toastify';
import fetchWithCookie from "../../api/fetchClient";
import { Button, Input, Label } from "./sharing/form";

export const SignupForm = ({ switchToSignin }) => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [loading, setLoading] = useState(false);
    const signupFormRef = useRef(null)
    const onSubmit = async (data, event) => {
        setLoading(true);
        event.preventDefault();
        try {
            await fetchWithCookie.post("/signup", { ...data })
            await setTimeout(() => {
                setLoading(false);
                toast.success("Successfully signed up. Now login", {
                    position: toast.POSITION.TOP_RIGHT
                });
                switchToSignin();
            }, 3000);
        }
        catch (error) {
            if (loading) setLoading(false);
            console.log({error, message: error?.response?.data?.message })
            toast.error(`${error?.response?.status || "Client"} Error: ${error?.response?.data?.message || error.message}`)
        }
    }
    return (
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                    Sign up for your new account
                </h1>
                <form
                    className="space-y-4 md:space-y-6"
                    ref={signupFormRef}
                    onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <Label htmlFor="name">Your name</Label>
                        <Input type="text" {...register("name")} id="name" placeholder="Your name" required="" />
                    </div>
                    <div>
                        <Label htmlFor="email">Your email</Label>
                        <Input type="email" {...register("email")} id="email" placeholder="Your company" required="" />
                    </div>
                    <div>
                        <Label htmlFor="password">Password</Label>
                        <Input type="password" {...register("password")} id="password" placeholder="••••••••" required="" />
                    </div>
                    <div>
                        <Label htmlFor="confirmPassword">Confirm Password</Label>
                        <Input type="password" {...register("confirmPassword")} id="confirmPassword" placeholder="••••••••" required="" />
                    </div>
                    <Button type="submit"
                        classNames={`${loading ? "loading" : ""}`}>
                        Sign up
                    </Button>
                    <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                        Already have an accoun? <a onClick={() => { switchToSignin() }} className="font-medium text-green-600 cursor-pointer hover:underline dark:text-green-500">Sign in</a>
                    </p>
                </form>
            </div>
        </div>
    )
}
