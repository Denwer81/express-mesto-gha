class ServerErrors extends Error {
  constructor(message = 'Ошибка по умолчанию') {
    super(message);
    this.message = { message };
    this.code = 500;
    this.name = 'ServerError';
  }
}

module.exports = ServerErrors;
