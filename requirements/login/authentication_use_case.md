# User Authentication Use Case

> ### Caso de sucesso

1. Sistema valida os dados
2. Sistema faz uma requisição para a URL da api
3. Sistema efetua a autenticação do usuário

> ### Exceção - Não inseriu email - Válidado

1. Sistema retorna um statusCode e uma mensagem de erro avisando que não inseriu o email

> ### Exceção - Email inválido (sem o @) - Válidado

1. Sistema retorna um statusCode e uma mensagem de erro avisando que o email está inválido

> ### Exceção - Email sem vínculo com alguma conta - Válidado

1. Sistema retorna um statusCode e uma mensagem de erro avisando que o email está inválido

> ### Exceção - Não inseriu a senha - Válidado

1. Sistema retorna um statusCode e uma mensagem de erro avisando que não inseriu a senha

> ### Exceção - Senha com menor que 8 caractéres - Válidado

1. Sistema retorna um statusCode e uma mensagem de erro avisando que a senha está menor que 8 caractéres

> ### Exceção - Senha inválida - Válidado

1. Sistema retorna um statusCode e uma mensagem de erro avisando que a senha ou o email estão inválidos
