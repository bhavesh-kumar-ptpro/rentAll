export const isAuthenticated = (state) => {
    console.log(state.auth);
    if (state.auth.auth.UserId >= 2) return true;
    return false;
};

export const isadminAuthenticated = (state) => {
    if (state.auth.auth.UserId === 1) return true;
    return false;
};
