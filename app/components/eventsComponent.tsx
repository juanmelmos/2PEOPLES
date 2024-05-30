'use client';

import Link from "next/link";
import style from "../ui/events.module.css";
import { useAuth } from "../context/authContext";
import { useEffect, useState } from 'react';
import Search from "./searchBar";

export default function EventsHeader() {
  const { isAuthenticated } = useAuth();
  const [idUser, setIdUser] = useState<number>(0);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1])) as { id: number };
      setIdUser(payload.id);
    }
  }, [isAuthenticated]);

  return (
    <header className={style.header}>
      <h1 className={style.h1}>Explore events</h1>
      <Search/>
      {idUser !== 0 ? (
        <Link href="/events/create" className={style.link}>Create a event</Link>
      ) : (
        <p className={style.link}>Log in to create an event</p>
      )}
    </header>
  );
}