#Comunicação Entre Sistemas

##Comunicação sincrona vs assincrona:
1. Sincrona:
	- Resposta em tempo "real";
	- O sistema aguarda o retorno da chamada;
	- Os outros processos esperam esse processo finalizar (o sistema "trava" enquanto esse processo executa);

2. Assincrona:
	- Resposta não é em tempo "real";
	- O sistema continua independente do retorno da chamada;
	- Não afeta outros processos;
	- Pode haver inconsistência eventual;

##REST (Representational state of transfer):
- Simples;
- Stateless;
- necessidade de sempre se identificar;
- Requisições independentes;
- Cacheável;
- Níveis de maturidade:
	1. Nível 0:
		- transações (procedimentos (rpc));
	2. Nível 1:
		- Utilização de resources:
		
			|Verbo |URI         |Operação|
			|:-----|:----------|--------:|
			|GET   |/products/1 |Buscar   |
			|POST  |/products   |Inserir  |
			|PUT   |/products/1 |Alterar  |
			|DELETE|/products/1 |Remover  |
			
	3. Nível 2:
		- Verbos HTTP:
		
			|Verbo|Utilização           |
			|:-----|-------------------:|
			|GET   |Recuperar informação|
			|POST  |Inserir             |
			|PUT   |Alterar             |
			|DELETE|Remover             |
			
	4. Nível 3:
		- HATEOAS: HyperMedia as the Engine of Application State (outras operações possíveis a partir da chamada):
		
		        {
		        	"account": {
		        		"account_number": 12345,
		        		"balance": {
		        			"currency": "usd",
		        			"value": 100.00
		        		},
		        		"links": {
		        			"deposit": "/accounts/12345/deposit",
		        			"withdraw": "/accounts/12345/withdraw",
		        			"transfer": "/accounts/12345/transfer",
		        			"close": "/accounts/12345/close"
		        		}
		        	}
		        }
