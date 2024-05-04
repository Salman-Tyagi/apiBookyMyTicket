export const getHomePage = (req, res, next) => {
  try {
    res.status(200).render('index', {
      title: 'Book My Ticket | Homepage',
      message: 'Hello World!',
    });
  } catch (err) {
    next(err);
  }
};
