class ServerErrors extends Error {
  constructor(message = 'Ошибка по умолчанию') {
    super(message);
    this.code = 500;
  }
}

module.exports = ServerErrors;