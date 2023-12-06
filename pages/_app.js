import '../styles/globals.css'
import '../styles/icons.css'
import { useRouter } from 'next/router';
import { LogoutProvider } from '../components/logout';

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  return (
    <LogoutProvider onLogout={() => {
      localStorage.removeItem('token');
      router.push('/');
    }}>
      <Component {...pageProps} />
    </LogoutProvider>
  );
}

export default MyApp;
//npm install @mui/material @emotion/react @emotion/styled
