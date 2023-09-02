"use client";
import React, {useEffect} from 'react'
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import axios from 'axios';


export default function page() {
	const router = useRouter();


	const [user, setUser] = React.useState({
		username: '',
		password: ''
	});
	const [BtnDisabled, setBtnDisabled] = React.useState(true);
	const [error, setError] = React.useState('');
	const [loading, setLoading] = React.useState(false);


	const onLogin = async () => {
		try {
			setLoading(true);
			const res = await axios.post('/api/users/login', user);
			console.log(res.data);
			setLoading(false);
			router.push('/profile');
		} catch (err: any) {
			setError(JSON.parse(err.request.response).error);
		}
		finally {
			setLoading(false);
		}
	}

	useEffect(() => {
		if (user.password && user.username) {
			setBtnDisabled(false);
		} else {
			setBtnDisabled(true);
		}
	}, [user]);


	return (
		<div className="flex flex-col items-center justify-center min-h-screen py-2">
			<h1
				className="text-6xl font-bold text-center text-blue-400 mb-8"
			>
				{loading ? "Processing" : "Login Page"}
			</h1>

			{error && (
				<div className=" text-center py-4 lg:px-4">
					<div className="p-2 bg-red-800 items-center text-indigo-100 leading-none lg:rounded-full flex lg:inline-flex"
							 role="alert">
						<span className="flex rounded-full bg-red-500 uppercase px-2 py-1 text-xs font-bold mr-3">Error</span>
						<span className="font-semibold mr-2 text-left flex-auto">{error}</span>
						<button
							onClick={() => setError('')}
						>
							<svg className="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg"
									 viewBox="0 0 20 20"><title>Close</title>
								<path
									d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/>
							</svg>
						</button>
					</div>
				</div>
			)}

			<div className='mb-4'>
				<label htmlFor="username" className="block font-medium"
				>Username</label>
				<input type="text" name="username" id="username" value={user.username}
					   onChange={e => setUser({...user, username: e.target.value})} placeholder='Username'
					   className='px-4 py-2 border border-gray-300 rounded-md text-black'/>
			</div>


			<div className='mb-4'>
				<label htmlFor="password" className="block font-medium">Password</label>
				<input type="password" name="password" id="password" value={user.password}
					   onChange={e => setUser({...user, password: e.target.value})} placeholder='Password'
					   className='px-4 py-2 border border-gray-300 rounded-md text-black'/>
			</div>
			<button
			className={`px-4 py-2 bg-blue-400 text-white rounded-md mt-8 ${BtnDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
			onClick={onLogin}
			disabled={BtnDisabled}
			>
				Login
			</button>
				<Link href='/signup' className='text-blue-400 mt-4'>
				Dont have an account? <u>Signup</u>
			</Link>
		</div>
	)
}
