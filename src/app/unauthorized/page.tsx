"use client";

import Link from 'next/link'
import React from 'react'

const page = () => {
  return (
    <div>
        <h1>Your access denied for this page</h1>
        <Link href="/"><button className='btn btn-primary border'>Home</button></Link>
    </div>
  )
}

export default page