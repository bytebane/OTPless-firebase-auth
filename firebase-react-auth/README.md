# OTPless Firebase Auth React App

## Steps to get started with Firebase+OTPless Auth

> !NOTE: This example uses [Vite](https://vitejs.dev/guide/)+[ReactJS](https://react.dev/).

1. Install dependencies

    ```bash
    npm install firebase
    ```

2. Create/Update `.env` file in root directory and set the environment variables as per your application following the template [.env.template](./.env.template)
3. Create an instance of an OAuthProvider using the provider ID you got in the Firebase console.

   ```js
    import { OAuthProvider } from "firebase/auth";

    const provider = new OAuthProvider('oidc.example-provider');
    ```

4. Authenticate with Firebase using the OAuth provider object.

    ```js
    import { getAuth, signInWithPopup, OAuthProvider } from "firebase/auth";

    const auth = getAuth();
    signInWithPopup(auth, provider)
    .then((result) => {
        // User is signed in.
        // IdP data available using getAdditionalUserInfo(result)

        // Get the OAuth access token and ID Token
        const credential = OAuthProvider.credentialFromResult(result);
        const accessToken = credential.accessToken;
        const idToken = credential.idToken;
    })
    .catch((error) => {
        // Handle error.
    });
   ```

5. That's it. Just use the `signInWithPopup()` method to authenticate with Firebase using OTPless Widget, and use `Firebase Auth` as you would to Update the user's profile, check auth state, Sign Out, etc.

> Check Out [Firebase Official Documentation](https://firebase.google.com/docs/auth/web/openid-connect) for more details.
