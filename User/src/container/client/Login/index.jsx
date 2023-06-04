import React, { useState } from 'react';
import { useStyles } from './login.style.page';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setLoginAction } from './../../../redux/Reducers/loginUser';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const renderSignInPage = (event) => {
  document.getElementById('signUpPage').style.transition = 'all 0.5s';
  document.getElementById('signInPage').style.transition =
    '0.7s 0.5s ease-in-out';
  document.getElementById('signInPage').style.transform = 'translateX(0px)';
  document.getElementById('signUpPage').style.transform = 'translateX(100%)';
};

const renderSignUpPage = (event) => {
  document.getElementById('signUpPage').style.transition =
    '0.7s 0.5s ease-in-out';
  document.getElementById('signInPage').style.transition = 'all 0.5s';
  document.getElementById('signInPage').style.transform = 'translateX(-100%)';
  document.getElementById('signUpPage').style.transform = 'translateX(0px)';
};

function Login() {
  const classes = useStyles();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [login, setLogin] = useState({
    userName: "",
    passWord: "",
  });

  const handleChangeLogin = (e) => {
    const { name, value } = e.target;
    setLogin({ ...login, [name]: value });
    console.log(login);
  };

  const Login = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.post(
        "http://localhost:5000/login-account",
        login
      );
      if (result.data) {
        alert("Đăng nhập thành công!");
        localStorage.setItem("user", JSON.stringify(result.data));
        const dataload = {
          isLogin: true,
          userInfo: result.data.result,
        }
        dispatch(setLoginAction(dataload));
        navigate('/');
      }
    } catch (err) {
      alert("Đăng nhập không thành công! Vui lòng thử lại!");
    }
  };

  const [signUp, setSignUp] = useState(
    {
      name: "",
      email: "",
      password: "",
      phone: "",
      username: "",
    }
  );

  const handleChangeSignUp = (e) => {
    const { name, value } = e.target;
    setSignUp({...signUp, [name]: value});
  }

  const Register = async (e) => {
    const cfpass = document.getElementById('cfpass');
    if (cfpass.value !== signUp.password)
    {
      alert('Mật khẩu không khớp! Vui lòng nhập lại!');
      return;
    }
    try {
      const result = await axios.post(
        "",
        signUp
      );
      alert("Đăng ký thành công!");
    } catch (err) {
      alert("Đăng ký không thành công!");
    }
  }

  return (
    <div className={classes.root}>
      {/* <div style={{ height: '70px' }}></div> */}
      <div class="navbar-detail">
        <Link to="/">
          <i class="bi bi-chevron-left" style={{ fontsize: 100 }}></i>
          Quay lại trang chủ
        </Link>
      </div>
      <div className={classes.flexBox}>
        <div className={classes.signIn} id="signInPage">
          <div className={classes.boxSignIn}>
            <div className={classes.it}>
              <div className={classes.btnChangePage}>
                <Button
                  onClick={renderSignUpPage}
                  variant="contained"
                  color="primary"
                >
                  Đăng ký
                </Button>
              </div>
            </div>
            <div className={classes.it}>
              <div className={classes.itBox}>
                <div className={classes.formBox}>
                  <div className={classes.title}>ĐĂNG NHẬP</div>
                  <form action="" autoComplete="off">
                    <div className={classes.inputField}>
                      <i class="bi bi-person"></i>
                      <input
                        onChange={handleChangeLogin}
                        type="text"
                        name="userName"
                        placeholder="Tên đăng nhập"
                      ></input>
                    </div>
                    <div className={classes.inputField}>
                        <i class="bi bi-lock"></i>
                      <input
                        onChange={handleChangeLogin}
                        type="password"
                        name="passWord"
                        placeholder="password"
                      ></input>
                    </div>
                    <div className={classes.btnBox}>
                      <Button onClick={Login}>Đăng nhập</Button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={classes.signUp} id="signUpPage">
          <div className={classes.boxSignUp}>
            <div className={classes.it}>
              <div className={classes.itBox}>
                <div className={classes.formBox}>
                  <div className={classes.title}>ĐĂNG KÝ</div>
                  <form action="" autoComplete="off">
                    <div className={classes.inputField}>
                        <i class="bi bi-envelope"></i>
                      <input
                        onChange={handleChangeSignUp}
                        type="email"
                        name="email"
                        placeholder="email"
                      ></input>
                    </div>
                    <div className={classes.inputField}>
                        <i class="bi bi-person"></i>
                      <input
                      onChange={handleChangeSignUp}
                        type="text"
                        name="username"
                        placeholder="username"
                      ></input>
                    </div>
                    <div className={classes.inputField}>
                        <i class="bi bi-lock"></i>
                      <input
                      onChange={handleChangeSignUp}
                        type="password"
                        name="password"
                        placeholder="password"
                      ></input>
                    </div>
                    <div className={classes.inputField}>
                    <i class="bi bi-lock"></i>
                      <input
                        type="password"
                        name="cfpassword"
                        id="cfpass"
                        placeholder="confirm password"
                      ></input>
                    </div>

                    <div className={classes.btnBox}>
                      <Button onClick={Register}>ĐĂNG KÝ</Button>
                    </div>
                  </form>
                </div>
              </div>
            </div>

            <div className={classes.it}>
              <div className={classes.btnChangePage}>
                <Button
                  onClick={renderSignInPage}
                  variant="contained"
                  color="primary"
                >
                  ĐĂNG NHẬP
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
