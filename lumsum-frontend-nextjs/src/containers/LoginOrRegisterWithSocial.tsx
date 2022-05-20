import React from 'react';
import GoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login';
import { useMutation } from '@apollo/react-hooks';
import LOGIN_WITH_SOCIAL from '../graphql/login-with-social.mutation';
import styles from '../styles/LoginOrRegisterWithSocial.module.scss';
import { message } from 'antd';
import { useRouter } from 'next/router';


const LoginOrRegisterWithSocial = () => {
    const router = useRouter();
    const [loginWithSocial, { loading }] = useMutation(LOGIN_WITH_SOCIAL, {
        onCompleted: (data) => {
            console.log("social login eventlogin");
            console.log({data});
            localStorage.setItem('token', data.loginWithSocial.accessToken);
            message.success("Login successful");
            router.replace("/dashboard")
        },
        onError: (error) => {
            message.error(error.message);
        }
    });

    const responseFacebook = (response: any) => {
        console.log("response from facebook");
        console.log({response});
        if (!response.error) {
            if (response.email) {
                let email
            }
            loginWithSocial({
                variables: {
                    "email": response.email,
                    "name": response.name,
                    "url": response.picture.data.url,
                    "role": "CUSTOMER",
                    "loginType": "FACEBOOK"
                }
            });
        }

    };
    const responseGoogle = (response: any) => {
        console.log("response from google");
        console.log({response});
        if (!response.error) {
            console.log({
                "email": response.profileObj.email,
                "name": response.profileObj.givenName + ' ' + response.profileObj.familyName,
                "url": response.profileObj.imageUrl,
                "role": "CUSTOMER",
                "loginType": "GOOGLE"
            });
            loginWithSocial({
                variables: {
                    "email": response.profileObj.email,
                    "name": response.profileObj.givenName + ' ' + response.profileObj.familyName,
                    "url": response.profileObj.imageUrl,
                    "role": "CUSTOMER",
                    "loginType": "GOOGLE"
                }
            });
        }
    }
    return (
        <div className={styles.flex}>
            <FacebookLogin
                appId="206790794372226"
                autoLoad={false}
                fields="name,email,picture"
                callback={responseFacebook}
                cssClass="my-facebook-button-class"
                textButton="Facebook"
            />
            <GoogleLogin
                clientId="917333478299-kpbk7rg6vspmjpq8884nrtlhk9tamkbm.apps.googleusercontent.com"
                render={renderProps => (
                    <span>
                        <button
                            className="my-google-button-class"
                            onClick={renderProps.onClick}
                            disabled={renderProps.disabled}
                        >Google</button>
                    </span>
                )}
                buttonText="Google"
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                cookiePolicy={'single_host_origin'}
            />
        </div>
    )
}

export default LoginOrRegisterWithSocial;