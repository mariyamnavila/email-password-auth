import { sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth";
import auth from "../../firebase.init";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
    const [success, setSuccess] = useState(false)
    const [loginError, setLoginError] = useState('')
    const emailRef = useRef()
    const handleLogin = (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        console.log(email, password)
        setSuccess(false);
        setLoginError('')
        signInWithEmailAndPassword(auth, email, password)
            .then((result) => {
                console.log(result.user);
                setSuccess(true)

            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(error, errorCode, errorMessage);
                setSuccess(false)
                setLoginError(errorMessage)
            });
    }

    const handleForgetPassword = () => {
        console.log('five',emailRef.current.value);
        const email = emailRef.current.value;
        if (!email) {
            console.log('Please provide a valid email address');    
        } else {
            sendPasswordResetEmail(auth,email)
            .then(()=>{
                alert('Reset email sent please check your email')
            })
            .catch((error)=>{
                console.log(error,'jjjj');
            })
        }
    }

    return (
        <div>
            <div className="hero bg-base-200 min-h-screen">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className="text-center lg:text-left">
                        <h1 className="text-5xl font-bold">Login now!</h1>
                        <p className="py-6">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur omnis qui adipisci dolor iste incidunt cumque, rem nam necessitatibus voluptate dolorem laboriosam, porro voluptatem odio nostrum ullam officia? Alias quisquam aut eius nostrum a animi error aliquid suscipit laudantium illum.
                        </p>
                    </div>
                    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                        <form onSubmit={handleLogin} className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input 
                                name="email" 
                                type="email" 
                                placeholder="email" 
                                ref={emailRef}
                                className="input input-bordered" 
                                required 
                                />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input name="password" type="password" placeholder="password" className="input input-bordered" required />
                                <label onClick={handleForgetPassword} className="label">
                                    <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                                </label>
                            </div>
                            <div className="form-control mt-6">
                                <button className="btn btn-primary">Login</button>
                            </div>
                        </form>
                        {
                            success && <p className="text-green-500">Sign up is successful</p>
                        }
                        {
                            loginError && <p className="text-red-500">{loginError}</p>
                        }
                        <p className="text-center pb-4">New to this website please <Link to={'/signUp'} className="font-bold">Sign Up</Link> </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;