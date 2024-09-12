"use client";
import Link from "next/link";
import styles from "./ModelLogin.module.css";
import { useState } from "react";
import classNames from "classnames";
import { useOpenModalState } from "@/context/LoginModalContext";
import { FormLogin } from "../FormLogin/FormLogin";
import { FormSignUp } from "../FormSignUp/FormSignUp";
export const ModelLogin = () => {
  const [formSignUp, setFormSignUp] = useState(true);
  const { isOpenModal, setIsOpenModal } = useOpenModalState();

  const changeForm = (e) => {
    setFormSignUp(!formSignUp);
  };

  const toggleModal = (e) => {
    setIsOpenModal(!isOpenModal);
  };

  return (
    <div
      className={classNames([styles.modalLogin], {
        [styles.modalLoginOpen]: isOpenModal,
        [styles.modalLoginClose]: !isOpenModal,
      })}
    >
      <div className={styles.forms}>
        <Link href="" onClick={toggleModal} className={styles.linkBack}>
          <span className={styles.iconBack}></span> Back
        </Link>
        <div className="">
          <div className={styles.buttons}>
            <button
              type="button"
              className={classNames({
                [styles.buttonActive]: formSignUp,
              })}
              onClick={changeForm}
            >
              Sign Up
            </button>
            <button
              type="button"
              className={classNames({
                [styles.buttonActive]: !formSignUp,
              })}
              onClick={changeForm}
            >
              Log in
            </button>
          </div>
        </div>
        <div className="">{formSignUp ? <FormSignUp /> : <FormLogin />}</div>
      </div>
      {formSignUp ? (
        <div className={styles.message}>
          <h2>Welcome to Quickbet Movies!</h2>
          <p>
            🎬 Ready to unlock a universe of cinematic delights? Sign up now and
            start your journey with us!
          </p>
          <div className={styles.image__login}></div>
        </div>
      ) : (
        <div className={styles.message}>
          <h2>Welcome back to Quickbet Movies!</h2>
          <p>
            🍿 Ready to dive into the world of unlimited entertainment? Enter
            your credentials and let the cinematic adventure begin!
          </p>
          <div className={styles.image__singup}></div>
        </div>
      )}
    </div>
  );
};
