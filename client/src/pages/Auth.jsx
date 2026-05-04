import React from 'react'
import { BsRobot } from "react-icons/bs";
import { IoSparkles } from "react-icons/io5";
import { motion } from "motion/react"
import { FcGoogle } from "react-icons/fc";
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../utils/firebase';
import axios from 'axios';
import { ServerUrl } from '../App';
import { useDispatch } from 'react-redux';
import { setUserData } from '../redux/userSlice';

function Auth({ isModel = false }) {
  const dispatch = useDispatch()

  const handleGoogleAuth = async () => {
    try {
      const response = await signInWithPopup(auth, provider)

      const user = response.user

      // 🔥 IMPORTANT: Firebase token lo
      const token = await user.getIdToken()

      // 🔥 Backend ko bhejo
      const result = await axios.post(
        ServerUrl + "/api/auth/google",
        { token },
        { withCredentials: true }
      )

      dispatch(setUserData(result.data))

    } catch (error) {
      console.log(error)
      dispatch(setUserData(null))
    }
  }

  return (
    <div className={`w-full ${isModel ? "py-4" : "min-h-screen flex items-center justify-center"}`}>
      <motion.div className="max-w-md p-8 bg-white rounded-2xl shadow-xl">

        <h1 className='text-xl font-semibold text-center mb-6'>
          Continue with AI Smart Interview
        </h1>

        <button
          onClick={handleGoogleAuth}
          className='w-full flex items-center justify-center gap-3 py-3 bg-black text-white rounded-full'
        >
          <FcGoogle size={20} />
          Continue with Google
        </button>

      </motion.div>
    </div>
  )
}

export default Auth
