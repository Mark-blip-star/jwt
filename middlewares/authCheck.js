const tokenService = require(`../services/tokenService.js`)

module.exports = async function(req,res,next){
	try{
		const authHeader = req.headers.authorization
		const refreshToken = req.cookies.Refresh
		if(!refreshToken){
			res.json({"error":"unauthorized"})
			throw new Error('unauthorized')
			
		}
		if(!authHeader){
			res.json({"error":"unauthorized"})
			throw new Error('unauthorized')
		}
		const accesToken = authHeader.split(` `)[1]
		const validateToken = await tokenService.validateAccesToken(accesToken)
		req.user = validateToken.payload.id
		next()
	}catch(e){
		throw e
	}
}