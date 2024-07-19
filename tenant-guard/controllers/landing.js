exports.landingGet = (req, res) => {
  res.render('landing.ejs', {siteTitle: 'TenantGuard Home'});
};