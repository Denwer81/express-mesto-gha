class BadRequestErrors extends Error {
  constructor(message = 'Переданы некорректные данные') {
    super(message);
    this.code = 400;
  }
}

module.exports = BadRequestErrors;
