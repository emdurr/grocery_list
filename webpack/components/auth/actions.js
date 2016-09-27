export const logout = () => {
  return {
    type: 'LOGOUT'
  }
}

export const loggedIn = (id, apiKey) => {
  return {
    type: 'LOGIN',
    id,
    apiKey
  }
}

const getToken = () => {
  return Math.random().toString(36).substring(7);
}

export const handleSignup = (first_name, last_name, email, password, redirect, history) => {
  return(dispatch) => {
    $.ajax({
      url: '/users',
      type: 'POST',
      data: { user: { first_name, last_name, email, password }},
      dataType: 'JSON'
    }).done( user => {
      let { id } = user;
      let api_key = getToken();
      localStorage.setItem('apiKey', api_key);
      localStorage.setItem('userId', id);
      dispatch(loggedIn(id, api_key));
      history.push(redirect);
      Materialize.toast('Successfull Sign up', 4000);
    }).fail( res => {
      console.log(res);
      Materialize.toast('Email has already been used', 4000);
    });
  }
}

export const handleLogin = (email, password, redirect, history) => {
  return(dispatch) => {
    $.ajax({
      url: '/users/sign_in',
      type: 'POST',
      data: { user: { email, password }},
      dataType: 'JSON'
    }).done( user => {
      let { id } = user;
      let api_key = getToken();
      localStorage.setItem('apiKey', api_key);
      localStorage.setItem('userId', id);
      dispatch(loggedIn(id, api_key));
      history.push(redirect);
      Materialize.toast('Successfully Signed In', 4000);
    }).fail( res => {
      Materialize.toast('Check Email or Password', 4000);
    });
  }
}

export const handleLogout = (history) => {
  return(dispatch) => {
    $.ajax({
      url: '/users/sign_out',
      type: 'DELETE',
      dataType: 'JSON'
    }).done( () => {
      localStorage.removeItem('apiKey');
      localStorage.removeItem('userId');
      dispatch(logout());
      history.push('/');
    });
  }

}

export const handleFacebookLogin = (auth, firstName, lastName, history) => {
  return(dispatch) => {
    $.ajax({
      url: '/facebook_login',
      type: 'POST',
      dataType: 'JSON',
      type: { auth, firstName, lastName }
    }).done( response => {
      let { id } = response;
      let api_key = getToken(); 

      localStorage.setItem('apiKey', api_key);
      localStorage.setItem('userId', id);
      dispatch(loggedIn(id, api_key));
      history.push(redirect);
    }).fail( () => {
      dispatch(logout());
    })
  }
}
