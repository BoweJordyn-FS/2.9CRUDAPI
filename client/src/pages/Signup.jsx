import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { useAuth } from '../context/AuthContext';

export default function Signup() {
	const navigate = useNavigate();
	const { signUp } = useAuth();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');
	const [isSubmitting, setIsSubmitting] = useState(false);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError('');
		setIsSubmitting(true);
		try {
			await signUp(email, password);
			navigate('/');
		} catch (err) {
			setError(err.message);
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<div className="flex justify-center">
			<form
				onSubmit={handleSubmit}
				className="w-full max-w-sm bg-[#FAF9F5] rounded-xl p-6 flex flex-col gap-4 shadow"
			>
				<h2 className="text-2xl font-semibold text-[#480902]">Sign Up</h2>

				{error && <p className="text-sm text-red-600">{error}</p>}

				<input
					type="email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					placeholder="Email"
					autoComplete="email"
					required
					className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-[#480902]"
				/>
				<input
					type="password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					placeholder="Password"
					autoComplete="new-password"
					required
					className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-[#480902]"
				/>

				<button
					type="submit"
					disabled={isSubmitting}
					className="px-4 py-2 bg-[#480902] text-white text-sm font-medium rounded-lg hover:bg-[#6b1003] transition-colors disabled:opacity-50"
				>
					{isSubmitting ? 'Creating account...' : 'Sign Up'}
				</button>

				<Link
					to="/login"
					className="text-sm text-[#480902] underline text-center"
				>
					Already have an account? Log in
				</Link>
			</form>
		</div>
	);
}
