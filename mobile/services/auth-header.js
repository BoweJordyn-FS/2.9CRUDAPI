const authHeader = () => {
	const user = JSON.parse(localStaorage.getItem('user'));
	if (user && user.token) {
		return { Authorization: ` Bearer ${user.token}` };
	} else {
		return {};
	}
};
export default authHeader;
