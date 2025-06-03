export const logout = async () => {
    try {
        const token = localStorage.getItem('token');
        if (!token) {
            return false;
        }

        const response = await fetch('http://localhost:8081/api/admin/logout', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error('Logout failed');
        }

        // Clear the token from localStorage regardless of server response
        localStorage.removeItem('token');
        return true;
    } catch (error) {
        console.error('Logout error:', error);
        // Still clear the token even if the server request fails
        localStorage.removeItem('token');
        return false;
    }
}; 