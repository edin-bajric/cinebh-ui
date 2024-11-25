import style from "./sign-in.module.scss";
import Logo from "../Icon";
import Button from "../Button";
import { Link } from "react-router-dom";
import { FaGoogle, FaApple, FaArrowLeft, FaEnvelope, FaLock } from "react-icons/fa6";

const SignIn = ({ closeModal }: { closeModal: () => void }) => {
  return (
    <div className={style.container}>
      <div className={style.content}>
        <div className={style.logo}>
          <Logo />
        </div>
        <div className={style.welcome}>
          <div className={style.back_button} onClick={closeModal}>
            <FaArrowLeft className={style.arrow} />
          </div>
          <div className={style.title}>Welcome Back</div>
        </div>
        <div className={style.form}>
          <div className={style.input}>
            <label>Email</label>
            <div className={style.inputWrapper}>
              <FaEnvelope className={style.icon} />
              <input type="text" placeholder="Email Address" />
            </div>
          </div>
          <div className={style.input}>
            <label>Password</label>
            <div className={style.inputWrapper}>
              <FaLock className={style.icon} />
              <input type="password" placeholder="Password" />
            </div>
          </div>

          <div className={style.options}>
            <div className={style.remember}>
              <input type="checkbox" />
              <label className={style.remeber_label}>Remember me</label>
            </div>
            <div className={style.forgot}>Forgot Password?</div>
          </div>
          <Button text="Sign In"/>
        </div>
        <div className={style.footer}>
          <div className={style.sign_up}>
            <p>Don't have an account yet?</p>
            <Link to="/sign-up" className={style.link}>
              Sign Up
            </Link>
          </div>
          <div className={style.divider}>
            <div className={style.line}></div>
            <p>or</p>
            <div className={style.line}></div>
          </div>
          <div className={style.social}>
            <p>Login with</p>
            <div className={style.social_icons}>
              <FaGoogle className={style.icon} />
              <FaApple className={style.icon} />
            </div>
          </div>
          <div className={style.continue}>
            <p>Continue without Signing In</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
