# User Login Use Case

> ### Caso de sucesso

1. Sistema valida os dados
2. Sistema faz uma requisição para a URL da api
3. Sistema efetua o registro

> ### Exceção - Não inseriu email

1. Sistema retorna um statusCode e uma mensagem de erro avisando que não inseriu o email

> ### Exceção - Email inválido (sem o @)

1. Sistema retorna um statusCode e uma mensagem de erro avisando que o email está inválido

> ### Exceção - Email sem vínculo com alguma conta

1. Sistema retorna um statusCode e uma mensagem de erro avisando que o email está inválido

> ### Exceção - Não inseriu a senha

1. Sistema retorna um statusCode e uma mensagem de erro avisando que não inseriu a senha

> ### Exceção - Senha com menor que 8 caractéres

1. Sistema retorna um statusCode e uma mensagem de erro avisando que a senha está menor que 8 caractéres
