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

export const handleSignup = (email, password, redirect, history) => {
  return(dispatch) => {
    $.ajax({
      url: '/users',
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
    }).fail( res => {
      console.log(res);
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
    }).fail( res => {
      //TODO show something on page
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
