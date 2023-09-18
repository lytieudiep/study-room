import SignInButton from '@/components/SignInButton';
import { useSession } from 'next-auth/react';
import Image from 'next/image'
import Link from 'next/link'
import React, { useState, useEffect } from 'react';
import Head from 'next/head'


export default function Home() {

  const session = useSession();
  const loggedIn = session.status == "authenticated";
  return (
    <>
      
        <Head>
          <title>Main space</title>
          <meta name ="homepage" property="og:title" content="Home page" key="title" />
        </Head>

        {/* Navbar */}
        <div className="navbar bg-primary-focus">
          <div className="navbar-start">
            <div className="dropdown">
              <label tabIndex={0} className="btn btn-ghost lg:hidden">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
              </label>
              <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                <li><a>Item 1</a></li>
                <li>
                  <a>Home</a>
                  <ul className="p-2">
                    <li><a>Submenu 1</a></li>
                    <li><a>Submenu 2</a></li>
                  </ul>
                </li>
                <li><a>Item 3</a></li>
              </ul>
            </div>
            <a className="btn btn-ghost normal-case text-xl text-base-100">FocusZone</a>
          </div>
          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1 text-base-100">
              <li><a>Home</a></li>
              <li tabIndex={0}>
                <details className="text-base-100">
                  <summary>Our service</summary>
                  <ul className="p-2">
                    <li><a>Submenu 1</a></li>
                    <li><a>Submenu 2</a></li>
                  </ul>
                </details>
              </li>
              <li><a>Contact </a></li>
            </ul>
          </div>
          <div className="navbar-end">

            {(loggedIn) ?
              <Link href={'/rooms'}
                className="btn btn-secondary"
              >
                My Rooms
              </Link>
              :
              <SignInButton />}

          </div>
        </div>

        {/* Hero */}
        <div className="hero min-h-screen" style={{ backgroundImage: 'url(https://images.pexels.com/photos/6985132/pexels-photo-6985132.jpeg)' }}>
          <div className="hero-overlay bg-opacity-60"></div>
          <div className="hero-content text-center">
            <div className="max-w-md">
              <h1 className="text-7xl text-base-100 font-bold">Welcome to your virtual study room</h1>
              <p className="text-base-100 py-6">Your study room to connect and complete the homework. Try new way manage the tasks</p>
              <button className="btn btn-primary">
                <Link href="/register">Register</Link>
              </button>
              <br></br>
              <button className="btn btn-active btn-link text-accent">
                <Link href="/login">Or already have an account?</Link>
              </button>
            </div>
          </div>
        </div>

    </>



  )
}
