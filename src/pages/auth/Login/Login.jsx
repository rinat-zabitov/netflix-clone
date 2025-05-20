import styles from './Login.module.css';
import logo from '../../../assets/logo.png';
import { useState } from 'react';
import { login, register } from '../../../firebase/firebase';
import netflix_spinner from '../../../assets/netflix_spinner.gif';
export const Login = () => {
  const [signState, setSignState] = useState('Sign In');
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);

  const handleChange = e => {
    setFormState(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const userAuth = async e => {
    e.preventDefault();

    setLoading(true);

    if (signState === 'Sign In') {
      await login(formState.email, formState.password);
    } else {
      await register(formState.name, formState.email, formState.password);
    }

    setLoading(false);
  };

  if (loading) {
    return (
      <div className={styles.loading}>
        <img src={netflix_spinner} alt="Loading" />
      </div>
    );
  }

  return (
    <div className={styles.login}>
      <img className={styles.loginLogo} src={logo} alt="" />
      <div className={styles.loginForm}>
        <h1>{signState}</h1>
        <form action="#">
          {signState === 'Sign Up' ? (
            <input
              type="text"
              name="name"
              placeholder="Your name"
              value={formState.name}
              onChange={handleChange}
            />
          ) : null}

          <input
            name="email"
            type="email"
            placeholder="Email"
            value={formState.email}
            onChange={handleChange}
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={formState.password}
            onChange={handleChange}
          />
          <button onClick={userAuth} type="submit">
            {signState}
          </button>
          <div className={styles.formHelp}>
            <div className={styles.remember}>
              <input type="checkbox" />
              <label htmlFor="">Remember Me</label>
            </div>
            <p>Need Help?</p>
          </div>
        </form>
        <div className={styles.formSwitch}>
          {signState === 'Sign In' ? (
            <p>
              New to Netflix?{' '}
              <span onClick={() => setSignState('Sign Up')}>Sign Up Now</span>
            </p>
          ) : (
            <p>
              Already have an account?{' '}
              <span onClick={() => setSignState('Sign In')}>Sign In Now</span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
