import Link from "next/link";
import { useRouter } from 'next/router'
// import { signIn } from "next-auth/react";
import * as S from "./ExternalLogins.styled";

import facebook from "@/assets/images/socialmedia/facebook.png";
import google from "@/assets/images/socialmedia/google.png";
import outlook from "@/assets/images/socialmedia/outlook.svg";

import useAuthStore from "@/store/useAuthStore";

const ExternalLogins = () => {
  const Login = useAuthStore((state) => state.login);
  const session = useAuthStore((state) => state.session);
  const router = useRouter()
  const { query } = router;
  // temp
  let queryRedirectUrl = query.redirectUrl as string
  const redirectUrl = queryRedirectUrl && queryRedirectUrl.length != 0 ? queryRedirectUrl : "/";
  // console.log(`https://chacrasoftware-lumsum-demo.herokuapp.com${query.redirectUrl as string}`, "redirectUrl")
  return (
    <S.ExternalLogins>
      <Link href="/api/auth/signin">
        <S.ExternalLoginOption
          hidden
          onClick={e => {
            e.preventDefault()
            // signIn('github', { callbackUrl: `https://chacrasoftware-lumsum-demo.herokuapp.com${query.redirectUrl as string}` })
            // signIn('github', { callbackUrl: query.redirectUrl as string })
          }}
          title="Login with GitHub">
          GitHub
        </S.ExternalLoginOption>
      </Link>
      <Link href={redirectUrl}>
        <S.ExternalLoginOption
          onClick={e => {
            // e.preventDefault()
            Login()
            // signIn('google', { callbackUrl: query.redirectUrl as string })
          }}
          title="Login with Google"
        >
          <S.ExternalLoginOptionIcon width="24" height="24" src={google} />
        </S.ExternalLoginOption>
      </Link>
      <Link href={redirectUrl}>
        <S.ExternalLoginOption
          onClick={e => {
            // e.preventDefault()
            Login()
            // signIn('google', { callbackUrl: query.redirectUrl as string })
          }}
          title="Login with Outlook"
        >
          <S.ExternalLoginOptionIcon width="24" height="24" src={outlook} />
        </S.ExternalLoginOption>
      </Link>
      <Link href={redirectUrl}>
        <S.ExternalLoginOption
          onClick={e => {
            // e.preventDefault()
            Login()
            // signIn('google', { callbackUrl: query.redirectUrl as string })
          }}
          title="Login with facebook"
        >
          <S.ExternalLoginOptionIcon width="24" height="24" src={facebook} />
        </S.ExternalLoginOption>
      </Link>
    </S.ExternalLogins>
  );
};

export default ExternalLogins;
