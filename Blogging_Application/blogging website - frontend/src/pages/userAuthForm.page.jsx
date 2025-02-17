import InputBox from "../components/input.component";
import google from '../imgs/google.png'
import { Link } from "react-router-dom";
import AnimationWrapper from '../common/page-animation'
import {toast,Toaster} from 'react-hot-toast';
import axios from 'axios';
import { storeInSession } from "../common/session.jsx";


const UserAuthForm = ({type}) =>{

    const userAuthThroughServer = (serverRoute,formData) => {
      
      axios.post(import.meta.env.VITE_SERVER_DOMAIN + serverRoute,formData)
      .then((response)=> {
        storeInSession("user",JSON.stringify(response.data))
        console.log(sessionStorage);
      })
      .catch((error) =>{
        toast.error(error.response.data.message);
        })
    }


    const handelSubmit = (e) =>{
        e.preventDefault();

      let serverRoute = type == "sign-in" ? "/signin" : "/signup";


        let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; // regex for email
        let passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/; // regex for password


        let form = new FormData(authForm);

        let formData = {};

        for(let [key,value] of form.entries()){
            formData[key] = value;
        }

        let {fullname,email,password} = formData;


        if((!fullname || fullname.length<3) && serverRoute == "/signup"){
            return toast.error(`Fullname is require and must be greater then 3 letter`);
           }
       
         if(!email){ 
           return toast.error("email is reuired");
       }
         if(!emailRegex.test(email)){ 
           return toast.error("Invalid email");
       }
         if(!password){ 
           return toast.error("passsword is required");
       }
         if(!passwordRegex.test(password)){ 
           return toast.error("password must bee strong");
       }

       userAuthThroughServer(serverRoute,formData);

    }

    return (
        <>
      <AnimationWrapper keyValue ={type}>
      <section className="h-cover flex items-center justify-center">

        <Toaster/>

        <form id="authForm" className="w-[80%] max-w-[400px]">
        <h1 className="text-4xl font-gelasio capitalize text-center mb-24">
        {type == "sign-in" ? "welcomeBack" : "Join us today"}
        </h1>

        {type != "sign-in" ? <InputBox
            name="fullname"
            type="text"
            placeholder="full name"
            icon="fi-rr-user"

        /> : ""}
       <InputBox
            name="email"
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
            onClick={handelSubmit}
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