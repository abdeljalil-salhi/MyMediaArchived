import * as ReactCSSTransitionGroup from "react-addons-css-transition-group";
import { FC, useState } from "react";
import { Helmet } from "react-helmet";

interface AuthenticationProps {}

export const Authentication: FC<AuthenticationProps> = () => {
  const [isLogin, setIsLogin] = useState(true);

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
            hello world
          </ReactCSSTransitionGroup>
        </div>
      </div>
    </>
  );
};
