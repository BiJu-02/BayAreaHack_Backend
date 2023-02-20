# BayAreaHack_Backend
A backend server that makes api calls to dummy server for proof of concept

API endpoints
<domainName> = localhost:3050
<restoName> = McD, Domino, Pizza Hut, Burger King
<foodName> = fries, mcSpicy, mcCheese, Whopper, veg pizza, chicken pizza, pepperoni pizza

1) getResto
url: http://<domainName>/getResto
response data format:
{
	restoName: {
		address: "address",
		delTime: intDelTime,
		delSrv: [
			{
				srvName: "srvName",
				delFee: intDelFee,
				offer: {
					minCartVal: int,
					discntPrcnt: float,
					maxDiscnt: int
				},
				...
			},
			...
		]
	},
	...
}

2) getRestoMenu
url: http://<domainName>/getRestoMenu?restoName=<restoName>
response data format: 
{
	foodItemName: [
		{
			price: int,
			delSrv: "delSrv"
		},
		...
	],
	...
}

3) getFood
url: http://<domainName>/getFood?foodName=<foodName>
response data format:
{
	restoName: {
		foodItemName: [
			{
				price: int,
				delSrv: "delSrv"
			},
			...
		],
		...
	},
	...
}
