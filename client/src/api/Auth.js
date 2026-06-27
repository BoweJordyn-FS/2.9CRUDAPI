const API_BASE = import.meta.env.DEV
	? 'http://localhost:3000/api/v1'
	: '/api/v1';

export const signin = async (email, password) => {
	const res = await fetch(`${API_BASE}/auth/signin`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ email, password }),
	});
	if (!res.ok) throw new Error('Invalid email or password');
	return res.json();
};

export const signup = async (email, password) => {
	const res = await fetch(`${API_BASE}/auth/`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ email, password }),
	});
	if (!res.ok) {
		const data = await res.json().catch(() => null);
		throw new Error(data?.error || 'Failed to create account');
	}
	return res.json();
};
