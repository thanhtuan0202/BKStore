import React, { useState } from 'react';
import { useStyles } from './login.style.page';
import { useDispatch } from 'react-redux';
import { setLoginAction } from './loginAdmin';
import { useHistory } from 'react-router-dom';
import axios from 'axios';


function LoginForAdmin() {
  const classes = useStyles();
  const history = useHistory();
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
        localStorage.removeItem("admin");
        localStorage.setItem("admin", JSON.stringify(result.data));
        
        sessionStorage.setItem("admin", JSON.stringify(result.data));
        const dataload = {
          isLogin: true,
          userInfo: result.data.result,
        }
        history.push("/");
        dispatch(setLoginAction(dataload));
      }
    } catch (err) {
      alert("Đăng nhập không thành công! Vui lòng thử lại!");
    }
  };

  return (
    <div className={classes.root}>
      <div className={classes.flexBox}>
        <div className={classes.signIn} id="signInPage">
          <div className={classes.boxSignIn}>
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
                        <button type="button" class="btn btn-primary btn-block mb-4" onClick={Login}>Đăng nhập</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginForAdmin;
