import * as ReactCSSTransitionGroup from "react-addons-css-transition-group";
import { FC, useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet";

import { Login } from "../components/login/Login";

interface AuthenticationProps {}

export const Authentication: FC<AuthenticationProps> = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isRegister, setIsRegister] = useState(false);

  const timerRegisterRef: any = useRef(null as any);
  const timerLoginRef: any = useRef(null as any);

  const goToRegister = () => {
    setIsLogin(false);
    timerRegisterRef.current = setTimeout(() => setIsRegister(true), 500);
  };

  const goToLogin = () => {
    setIsRegister(false);
    timerLoginRef.current = setTimeout(() => setIsLogin(true), 500);
  };

  useEffect(() => {
    return () => clearTimeout(timerRegisterRef.current);
  }, []);

  useEffect(() => {
    return () => clearTimeout(timerLoginRef.current);
  }, []);

  return (
    <>
      <Helmet>
        <title>MyMedia - {isLogin ? "Log In" : "Sign Up"}</title>
        <meta name="description" content="Authenticate into MyMedia!" />
      </Helmet>
      <div className="authContainer">
        <div className="authWrapper">
          <div className="auth">
            <div className="authLogo">MyMedia</div>
            <span className="authDesc">Connect with the world on MyMedia.</span>
          </div>
          <ReactCSSTransitionGroup
            transitionName="authTransition"
            transitionEnterTimeout={300}
            transitionLeaveTimeout={300}
          >
            {isLogin && <Login goToRegister={goToRegister} />}
          </ReactCSSTransitionGroup>
        </div>
      </div>
    </>
  );
};
