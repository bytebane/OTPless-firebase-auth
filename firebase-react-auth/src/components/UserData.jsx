import { auth } from '../services/firebase'

const UserData = () => {
	const keyVal = (key, value) => {
		return (
			value && (
				<div className='key-value'>
					<span className='key'>{key}</span>
					<span className='value'>{value}</span>
				</div>
			)
		)
	}

	return (
		<main className='user-data'>
			<h1>{auth.currentUser === null ? 'Not Signed In' : 'User Data'}</h1>
			{auth.currentUser && (
				<>
					{keyVal('UserId', auth.currentUser.uid)}
					{keyVal('Display Name', auth.currentUser.displayName)}
					{keyVal('Email Address', auth.currentUser.email)}
					{keyVal('Phone Number', auth.currentUser.phoneNumber)}
					{keyVal('isAnonymous', auth.currentUser.isAnonymous)}
					{keyVal('isEmailVerified', auth.currentUser.emailVerified ? 'Yes' : 'No')}
					{keyVal('Registration Time', auth.currentUser.metadata.creationTime)}
					{keyVal('Last Sign In Time', auth.currentUser.metadata.lastSignInTime)}
				</>
			)}
		</main>
	)
}

export default UserData
