module.exports.getHomepage = (req, res) => {
  return res.status(200).render('homepage.ejs', {siteTitle: 'TenantGuard Home', path: '/'});
};

module.exports.getAbout = (req, res) => {
  return res.status(200).render('about.ejs', {siteTitle: 'TenantGuard About', path: '/about'})
}
