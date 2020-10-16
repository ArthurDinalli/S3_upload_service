const request = require("request");

module.exports = async (req, res, next) => {
	const token = req.headers.bearer;

	if (!token) return res.status(401).send();

	const url = process.env.AUTH_URL;
	request.get(
		url,
		{
			headers: {
				Bearer: token,
			},
		},
		(err, response, body) => {
			if (err) {
				console.log(err);
				return res.status(401).send();
			}

			if (response.statusCode !== 200)
				return res.status(401).send();
			
			body = JSON.parse(body);
			req.auth_user = body;
			next();
		}
	);
};
