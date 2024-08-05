export const protectorMiddleware = (req, res, next) => {
    console.log('Logged In:', req.session.loggedIn);
    if (req.session.loggedIn) {
      return next();
    } else {
      req.flash('error', 'Log in first.');
      return res.redirect('/login');
    }
  };