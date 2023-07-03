const reducerInput = (state, actions) => {
  switch (actions.type) {
    case "Name": {
      return { ...state, name: actions.payload };
    }
    case "Email": {
      return { ...state, email: actions.payload };
    }
    case "Password": {
      return { ...state, password: actions.payload };
    }
    default: {
      return state;
    }
  }
};

export { reducerInput };
