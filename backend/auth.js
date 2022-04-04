const jwt = require("jsonwebtoken");

module.exports = async (request, response, next) => {
    try {
        // getting the token from the authorization
        const token = await request.headers.authorization.split(" ")[1];

        // check if token matches the origin
        const decodedToken =  await jwt.verify(
            token,
            "RANDOM-TOKEN"
        );

        // retrieve the user details of the logged in user
        const user =  await decodedToken;

        // pass the user to the endpoint
        request.user = user;

        // pass the functionality to the endpoint
        next();

    } catch (error) {
        response.status(401).json({
            error: new Error("Invalid request")
        });
    }
}