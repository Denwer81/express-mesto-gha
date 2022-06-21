class NotFoundError extends Error {
  constructor(message = 'Переданые данные не найдены') {
    super(message);
    this.code = 404;
  }
}

module.exports = NotFoundError;