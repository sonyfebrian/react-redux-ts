import React from "react";
import { useNavigate } from "react-router-dom";
import { isAuthenticated } from "../../services/authenticationService";
import { useAppDispatch } from "../../hook";
import { authenticateUser } from "./loginSlice";


export const LoginPage = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch()
    
   
      const onFinish = (values: any) => {
        // dispatch(authenticateUser(values));
        navigate('/home');
        // if (isAuthenticated()) {
        //     navigate('/home');
        //   }
    };
    return (
        <>
        <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
            <div className="w-full p-6 m-auto bg-white rounded-md shadow-md lg:max-w-xl">
                <div className="flex justify-center">
                <img 
          alt=""
          className="h-14 w-14"
          src="https://ik.imagekit.io/pibjyepn7p9/Lilac_Navy_Simple_Line_Business_Logo_CGktk8RHK.png?ik-sdk-version=javascript-1.4.3&updatedAt=1649962071315"/>
          
                </div>
                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
    Login to your account</h2>
                <form  onSubmit={onFinish}className="mt-6">
                    <div className="mb-2">
                    <label className="block text-sm font-semibold text-gray-800"> username</label>
                       
                       <input
                       type="text"
                       
                           className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                            />
                    </div>
                    <div className="mb-2">
                        <label className="block text-sm font-semibold text-gray-800"> password</label>
                       
                       <input
                       type="password"
                       
                       className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                       
                            />
                    </div>
                    <div className="mt-6">
                           <button type="submit" className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600">
                                Login
                            </button>
                    </div>
                    <div className="form-group">
              
              
            </div>
                </form>
    
            </div>
        </div>
        </>
      )

}