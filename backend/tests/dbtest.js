sequelize.authenticate()
    .then(() => console.log('sucesso'))
    .catch(error => console.error('erro:', error));