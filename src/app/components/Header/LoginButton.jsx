"use client"

import React from 'react'
import { useRouter } from 'next/navigation'
const LoginButton = () => {
    const router = useRouter()
  return (
    <div>
        <button
            className="max-lg:hidden px-6 py-3 text-sm text-white rounded-sm border-2 border-[#dfe0df] bg-[#153d38] hover:bg-[#0c201e]"
            onClick={() => router.push('/login')}
        >
            Log In
        </button>

    </div>
  )
}

export default LoginButton
