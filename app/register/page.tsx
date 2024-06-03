'use client'

import "../ui/globals.css";
import "../ui/page.module.css"
import style from "../ui/login-register.module.css"
import { registerUser } from "../../lib/actions";
import Link from "next/link";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from '../context/authContext';


// test

export default function Register() {
  const router = useRouter();
  const { login } = useAuth();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const result = await registerUser(formData);

    if (result.success && result.token) {
      localStorage.setItem('token', result.token);
      login();
      router.push('/');
      router.refresh();
    } else {
      alert(result.message || 'Registration failed, please try again.');
    }
  };

  return (
    <div className={style.container}>
      <div className={style.formBox}>
        <h2 className={style.headerForm}>Register</h2>
        <form onSubmit={handleSubmit}>
          <label className={style.label}>
            Username:
            <input className={style.input} type="text" name="user" required />
          </label>
          <br />
          <label className={style.label}>
            Password:
            <input className={style.input} type="password" name="password" required />
          </label>
          <br />
          <button className={style.send} type="submit">Send</button>
        </form>
        <p>I have an account, <Link href="/login" className={style.link}>log in</Link></p>
      </div>
    </div>
  );
}


// //real

// export default function Register() {
//   return (
//     <>
//       <div className={style.container}>
//         <div className={style.formBox}>
//           <h2 className={style.headerForm}>Register</h2>
//           <form action={register}>
//             <label className={style.label}>
//               Username:
//               <input className={style.input} type="text" name="user" required />
//             </label>
//             <br />
//             <label className={style.label}>
//               Password:
//               <input className={style.input} type="password" name="password" required />
//             </label>
//             <br />
//             <button className={style.send} type="submit">Send</button>
//           </form>
//           <p>I have an account, <Link href="/login" className={style.link}>log in</Link></p>
//         </div>
//       </div>
//     </>
//   );
// }