// @flow

import React, {useState, useEffect} from 'react'
import 'styles/Login.scss'
import {ICON_ARROWRIGHT} from 'assets/styles/icons'
import {PIC_LOGIN} from 'assets/styles/icons'
import messages from 'utils/messages'
import {useDispatch, useSelector} from 'react-redux'
import auth from 'store/auth/index'
import profile from 'store/customer/profile/index'
import {useHistory} from 'react-router-dom'
import {useToasts} from 'react-toast-notifications'
import {emailValid, mobileNumberValid, validNationalCode} from 'utils/validations'
import OtpInput from 'react-otp-input'
import {toastConstant} from 'utils/variables'
import {tokenType} from 'utils/secureStorage'
import errorMessages from 'utils/errorMessages'

function Login() {
  const history = useHistory()
  const [renderLogin, setRenderLogin] = useState(false)
  const [autoLogin, setAutoLogin] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('JWT')
    if (token) {
      const menuData = JSON.parse(localStorage.getItem(tokenType.MENU))
      if (!menuData) {
        setRenderLogin(true)
        dispatch(auth.actions.logOut())
        return
      }
      const firstMenu = menuData.filter((item) => {
        if (item.order === 1) return item
      })
      history.replace(firstMenu[0].path)
    } else {
      setRenderLogin(true)
    }
  }, [])

  const [username, setUsername] = useState('')
  const [code, setCode] = useState('')
  const [showForm, setShowForm] = useState(true)
  const [disable, setDisable] = useState(false)
  const otpToken = useSelector((state) => state.auth.getOtpToken)
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()
  const {addToast} = useToasts()
  const validNumber = username.match(mobileNumberValid)
  const validEmail = username.match(emailValid)
  const persianNumber = validNationalCode(username.toString())
  const shortlive = useSelector((state) => state.auth.rememberMe)

  useEffect(() => {
    if (!validNumber && !validEmail && !persianNumber) {
      setDisable(true)
    } else {
      setDisable(false)
    }
  }, [username])

  function handleChangeUserName(e) {
    setUsername(e.target.value)
  }
  function handleSubmitUserName() {
    if (!validNumber && !validEmail && !persianNumber) {
      return addToast(messages.ERROR_VALIDATION_USERNAME, {
        appearance: toastConstant.ERROR,
        autoDismiss: true
      })
    }
    setLoading(true)
    dispatch(auth.actions.getOtp({username: username}))
      .then(() => {
        setShowForm(false)
        setLoading(false)
        addToast(messages.SUCCSESS_CODE, {
          appearance: toastConstant.SUCCESS,
          autoDismiss: true
        })
      })
      .catch((err) => {
        setLoading(false)
        return addToast(errorMessages(err.detail), {
          appearance: toastConstant.ERROR,
          autoDismiss: true
        })
      })
  }
  function enterSubmitUserName(e) {
    if (e.keyCode === 13) {
      handleSubmitUserName()
    }
  }
  function handleChangeOtp(otp) {
    setCode(otp)
    let verify = otp.length
    if (autoLogin && verify === 5) {
      const data = {
        username: username,
        code: otp,
        token: otpToken,
        shortlive: shortlive
      }
      setLoading(true)
      dispatch(auth.actions.loginOtp(data))
        .then((response) => {
          setAutoLogin(false)
          dispatch(profile.actions.getProfile())
          const menu = response.menu
          const firstMenu = menu.filter((item) => {
            if (item.order === 1) return item
          })
          history.replace(firstMenu[0].path)
        })
        .catch((err) => {
          setAutoLogin(false)
          setLoading(false)
          return addToast(errorMessages(err.detail), {
            appearance: toastConstant.ERROR,
            autoDismiss: true
          })
        })
    }
  }
  function handleSubmitOtp() {
    if (code.length <= 4) {
      return addToast(messages.ERROR_VALIDATION_CODE, {
        appearance: toastConstant.ERROR,
        autoDismiss: true
      })
    }
    const data = {
      username: username,
      code: code,
      token: otpToken
    }
    setLoading(true)
    dispatch(auth.actions.loginOtp(data))
      .then((response) => {
        const menu = response.menu
        const firstMenu = menu.filter((item) => {
          if (item.order === 1) return item
        })
        history.replace(firstMenu[0].path)
      })
      .catch((err) => {
        setLoading(false)
        return addToast(errorMessages(err.detail), {
          appearance: toastConstant.ERROR,
          autoDismiss: true
        })
      })
  }
  function interSubmitOtp(e) {
    if (e.keyCode === 13) {
      handleSubmitOtp()
    }
  }
  function maxLength() {
    let max = null
    if (username.startsWith('09')) {
      max = 11
    }
    return max
  }
  function handleChangeForgot() {
    dispatch(auth.actions.rememberMe())
  }

  if (renderLogin) {
    return (
      <div className="login-form">
        <section className="LoginLeft">
          <div className=" LoginLeft__container">
            <div className="LoginLeft__form">
              <div className="LoginLeft__form__container">
                <div className="LoginLeft__form__logo">
                  <p className={'LoginLeft__form__logo__content'}>{messages.ENGLISH_GHESTI_CARD}</p>
                </div>
                <div className="LoginLeft__form__welcome">
                  <h5 className="LoginLeft__form__welcome__h5">{messages.WELCOME}</h5>
                </div>
                {showForm ? (
                  <div className="LoginLeft__form__value">
                    <div>
                      <p className="LoginLeft__form__value__title">{messages.ENTER_TELEPHON_NUMBER_EMAIL}</p>
                    </div>

                    <div className="LoginLeft__form__value__input">
                      <input
                        type="tel"
                        value={username}
                        onKeyDown={enterSubmitUserName}
                        onChange={handleChangeUserName}
                        name="username"
                        placeholder={messages.TELEPHON_NUMBER_EMAIL}
                        className="LoginLeft__form__input"
                        maxLength={maxLength()}
                      />
                    </div>
                    <div className="LoginLeft__form__value__button">
                      {loading ? (
                        <div className={'loading-container'}>
                          <div className={'LoginLeft__form__button_loading'} />
                        </div>
                      ) : (
                        <button
                          className={`LoginLeft__form__button ${disable && 'disable'}`}
                          onClick={handleSubmitUserName}
                          disabled={disable}
                        >
                          {messages.LOGIN}
                          <img className="LoginLeft__form__button__img" src={ICON_ARROWRIGHT} alt={messages.IMG_ALT} />
                        </button>
                      )}
                    </div>
                    <div className="LoginLeft__form__value__checkbox">
                      <p className="LoginLeft__form__p">{messages.REMEMBER_ME}</p>
                      <input
                        className="LoginLeft__form__checkbox"
                        type="checkbox"
                        value={shortlive}
                        onChange={handleChangeForgot}
                      />
                    </div>
                  </div>
                ) : (
                  <div className="LoginLeft__form__value">
                    <div>
                      <p className="LoginLeft__form__value__title">{messages.ENTER_OTP}</p>
                    </div>
                    <div className="LoginLeft__form__value__input">
                      <div className="LoginLeft__form__value__input__otp" onKeyDown={interSubmitOtp}>
                        <OtpInput
                          value={code}
                          name="code"
                          onChange={handleChangeOtp}
                          numInputs={5}
                          shouldAutoFocus={true}
                          isInputNum={true}
                          className="LoginLeft__form__otp"
                          containerStyle={'otp-inputs'}
                        />
                      </div>
                    </div>
                    <div className="LoginLeft__form__value__button">
                      {loading ? (
                        <div className={'loading-container'}>
                          <div className={'LoginLeft__form__button_loading'} />
                        </div>
                      ) : (
                        <button className={`LoginLeft__form__button`} onClick={handleSubmitOtp}>
                          {messages.CONFIRM_CODE}
                          <img className="LoginLeft__form__button__img" src={ICON_ARROWRIGHT} alt={messages.IMG_ALT} />
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
        <section className="LoginRight">
          <div className=" LoginRight__container">
            <div className="LoginRight__form">
              <div className=" LoginRight__form__container">
                <div className="LoginRight__form__title">
                  <h6>{messages.UPDATE}</h6>
                </div>
                <div className="LoginRight__form__text">
                  <p>{messages.ATTRACTIVE_FEATURE}</p>
                  <p>{messages.SYSTEM}</p>
                </div>
                <div className="LoginRight__form__learnmore">
                  <a href="">{messages.LEARN_MORE}</a>
                </div>
                <div className="LoginRight__form__pic">
                  <img src={PIC_LOGIN} alt={messages.IMG_ALT} />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    )
  } else {
    return <div />
  }
}

export default Login
