import { createUserWithEmailAndPassword } from "firebase/auth";
import auth from "../../firebase.init";
import { useState } from "react";
import { FaEye } from "react-icons/fa";
import { RiEyeCloseLine } from "react-icons/ri";

const SignUp = () => {
    const [success, setSuccess] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const [showPassword, setShowPassword] = useState(false)


    const handleSignUp = (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        const terms = e.target.terms.checked;
        console.log(email, password,terms);

        setErrorMessage('');
        setSuccess(false);

        if (!terms) {
            setErrorMessage('Please accept our terms and conditions');
            return
        }

        if (password.length < 6) {
            setErrorMessage('Password should be 6 character or longer');
            return;
        }

        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{6,}$/;

        if (!passwordRegex.test(password)) {
            setErrorMessage('at least one uppercase, at least one lowercase, at least one number and at least one special character and length has to be at least 6 characters');
            return
        }

        createUserWithEmailAndPassword(auth, email, password)
            .then((result) => {
                console.log(result.user);
                setSuccess(true)
            })
            .catch((error) => {
                // const errorCode = error.code;
                // const errorMessage = error.message;
                console.log('error', error);
                setErrorMessage(error.message)
                setSuccess(false)
            });
    }

    return (
        <div>
            <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl mx-auto">
                <h1 className="text-5xl font-bold">Sign Up now!</h1>
                <form onSubmit={handleSignUp} className="card-body">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input name="email" type="email" placeholder="email" className="input input-bordered" required />
                    </div>
                    <div className="form-control relative">
                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>
                        <input
                            type={showPassword ? 'text' : 'password'}
                            name="password"
                            placeholder="password"
                            className="input input-bordered"
                            required />
                        <button
                            onClick={() => { setShowPassword(!showPassword) }}
                            className="btn btn-ghost btn-xs absolute right-6 top-7"
                        >
                            {showPassword ? <RiEyeCloseLine /> : <FaEye />}
                        </button>
                        <label className="label">
                            <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                        </label>
                    </div>
                    <div className="form-control">
                        <label className="label justify-start cursor-pointer">
                            <input type="checkbox" name="terms" className="checkbox" />
                            <span className="label-text ml-1">Accept Our Terms and Conditions.</span>
                        </label>
                    </div>
                    <div className="form-control mt-6">
                        <button className="btn btn-primary">Sign Up</button>
                    </div>
                </form>
                {
                    errorMessage && <p className="text-red-500">{errorMessage}</p>
                }
                {
                    success && <p className="text-green-500">Sign up is successful</p>
                }
            </div>
        </div>
    );
};

export default SignUp;