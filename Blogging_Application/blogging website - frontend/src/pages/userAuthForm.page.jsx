import InputBox from "../components/input.component";
import google from '../imgs/google.png'
import { Link } from "react-router-dom";
import AnimationWrapper from '../common/page-animation'
const UserAuthForm = ({type}) =>{
    return (
        <>
      <AnimationWrapper keyValue ={type}>
      <section className="h-cover flex items-center justify-center">
        <form className="w-[80%] max-w-[400px]">
        <h1 className="text-4xl font-gelasio capitalize text-center mb-24">
        {type == "sign-in" ? "welcomeBack" : "Join us today"}
        </h1>

        {type != "sign-in" ? <InputBox
            name="full name"
            type="text"
            placeholder="full name"
            icon="fi-rr-user"

        /> : ""}
       <InputBox
            name="emsil"
            type="text"
            placeholder="email"
            icon="fi-rr-at"
/>
          <InputBox
            name="password"
            type="password"
            placeholder="password"
            icon="fi-rr-lock"
/>

            <button className="btn-dark center mt-14"
            type="submit"
            >
                {type.replace("-"," ")}
            </button>

            <div className="relative w-full flex items-center gap-2 my-10 opacity-50 uppercase text-black font-bold">
                <hr className="w-1/2  border-black"/>
                <p>or</p>
                <hr className="w-1/2 border-black"/>
            </div>

            <button className="btn-dark center text-center flex justify-center gap-3">
            <img src={google} alt=""  className="w-5"/>
            continue with google
            </button>

            {
                type == "sign-in" ?
                <p className="mt-6 text-dark-grey text-xl text-center" >
                Don't have an account?
                <Link to='/signup' className="underline text-black text-xl ml-1">
                    Join us today
                </Link>
                </p>
                :
                <p className="mt-6 text-dark-grey text-xl text-center" >
                Don't have an account?
                <Link to='/signin' className="underline text-black text-xl ml-1">
                    Sign in here
                </Link>
                </p>
            }

        </form>
        </section>
      </AnimationWrapper>
        </>
    )
}
export default UserAuthForm;