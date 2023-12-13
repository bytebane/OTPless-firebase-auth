import './App.css'
import { OAuthProvider, signInWithPopup } from 'firebase/auth'
import { auth } from './services/firebase'
import { useEffect, useState } from 'react'
import UserData from './components/UserData'

function App() {
	const [notifyText, setNotifyText] = useState('')
	const [isSignedIn, setIsSignedIn] = useState(null)

	/**
	 * Initialize the OAuth provider with the Provider ID
	 * from {@link import(../README.md) Step4.2}
	 * from your Firebase Auth>Sign In Method>OTPless Authentication(in Sign In Providers section)
	 */
	const provider = new OAuthProvider(import.meta.env.VITE_APP_FIREBASE_PROVIDER_ID)

	// Authentication handler
	const authHandler = () => {
		setNotifyText('Authenticating...')
		signInWithPopup(auth, provider)
			.then(() => {
				// User is signed in.
				setNotifyText('Signed In!')
			})
			.catch((error) => {
				// Handle error.
				setNotifyText(`Error: ${error}`)
				console.log(error)
			})
	}

	// Sign out user
	const signOut = () => {
		auth.signOut()
			.then(() => {
				setNotifyText('Signed Out')
			})
			.catch((error) => {
				setNotifyText(`Error: ${error}`)
				console.log(error)
			})
	}

	useEffect(() => {
		// Add auth state change listener on mount
		auth.onAuthStateChanged((user) => {
			if (user) setIsSignedIn(true)
			else setIsSignedIn(false)
		})
	}, [])

	useEffect(() => {
		setNotifyText(isSignedIn ? 'User Authenticated' : 'UnAuthenticated')
	}, [isSignedIn])

	return isSignedIn === null ? (
		<div className='loading'>
			<h1>Loading...</h1>
		</div>
	) : (
		<>
			<header className='buttons'>
				<button onClick={isSignedIn ? signOut : authHandler}>{isSignedIn ? 'SignOut' : 'SignIn/SignUp'}</button>
			</header>
			<UserData />
			<footer>{notifyText}</footer>
		</>
	)
}

export default App
