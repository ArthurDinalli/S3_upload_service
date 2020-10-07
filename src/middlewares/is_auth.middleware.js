const request = require("request");

module.exports = async (req, res, next) => {
	const token = req.headers.bearer;

	if (!token) return res.status(401).send();

	req.auth_user = {
		name: "Marcelo Ivo",
		cpf: "11231231231",
		cellphone: "1231231231231",
		email: "email@email.com",
		id: 1,
		activated: 1,
		groups: [
			{
				code: "code",
				title: "Grupo top",
				is_department_master: 1,
			},
		],
	};
	next();

	// const url = `http://auth-api:3000/internal/auth`;

	// request.get(
	// 	url,
	// 	{
	// 		headers: {
	// 			Bearer: token,
	// 		},
	// 	},
	// 	(err, response, body) => {
	// 		if (err) {
	// 			console.log(err);
	// 			return res.status(401).send();
	// 		}

	// 		if (response.statusCode !== 200)
	// 			return res.status(401).send();

	// 		body = JSON.parse(body);

	// 		req.auth_user = body;

	// 		console.log(req.auth_user);

	// 		next();
	// 	}
	// );
};
