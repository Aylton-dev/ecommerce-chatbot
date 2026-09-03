# ecommerce-chatbot

Backend do chatbot de suporte da loja. A aplicação utiliza Node.js, Express e a API do Google Gemini.

## Requisitos

- Node.js 22 ou superior
- Uma chave de API do Gemini criada no [Google AI Studio](https://aistudio.google.com/apikey)

## Configuração do ambiente

Crie um arquivo chamado `.env` na raiz do projeto.

Adicione os valores abaixo:

```env
GEMINI_API_KEY=sua_chave_de_api_do_gemini
PORT=3000
```

`GEMINI_API_KEY` deve conter sua chave real do Google Gemini.

`PORT=3000` define a porta usada pelo backend. O frontend deve acessar a API através de `http://localhost:3000`.

## Executando o backend

instale as dependencias primeiro com:

```bash
npm install
```

Inicie o servidor com:

```bash
npm start
```

Quando estiver funcionando, o backend estará disponível em:

```text
http://localhost:3000
```

## Endpoints principais

Mensagem inicial do chatbot:

```text
GET http://localhost:3000/api/chat/initial-message
```

Envio de mensagem:

```text
POST http://localhost:3000/api/chat
```

Exemplo de corpo da requisição:

```json
{
	"message": "Qual é a ficha técnica do NOVA BOOK ULTRA?",
	"topic": "geral",
	"history": []
}
```

Documentação Swagger:

```text
http://localhost:3000/api-docs
```