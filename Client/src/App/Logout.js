export default function Logout() {
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('auth');
}