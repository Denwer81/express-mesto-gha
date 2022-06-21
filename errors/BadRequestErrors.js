class BadRequestErrors extends Error {
  constructor(message = 'Переданы некорректные данные') {
    super(message);
    this.message = JSON.stringify({ message });
    this.code = 400;
  }
}

module.exports = BadRequestErrors;
