const UserModule = require("../models/user-model")
const bcrypt = require("bcrypt")
const uuid = require("uuid")
const tokenService = require("../services/token-service")
const ApiError = require("../exceptions/api-error")
const UserDto = require("../dtos/user-dto");

class UserService {
    async registration(email, password, role) {
        const candidate = await UserModule.findOne({email})

        if (candidate !== null) {
            throw ApiError.BadRequest(`User with this email: ${email} already exist`)
        }

        const hashPassword = await bcrypt.hash(password, 3)
        const user = await UserModule.create({email, password: hashPassword, role, name: "", phone: "", transports: []})

        return tokenService.setToken(user)
    }

    async login(email, password) {
        const user = await UserModule.findOne({email})

        if (!user) {
            throw ApiError.BadRequest("User wasn't find")
        }

        const isPassEquals = await bcrypt.compare(password, user.password)

        if (!isPassEquals) {
            throw ApiError.BadRequest("No correct password")
        }

        return tokenService.setToken(user)
    }

    async logout(refreshToken) {
        const token = await tokenService.removeToken(refreshToken)
        return token
    }

    async refresh(refreshToken) {
        if(!refreshToken) {
            throw ApiError.UnauthorizedError()
        }

        const userData = tokenService.validateRefreshToken(refreshToken)
        const tokenFromDb = await tokenService.findToken(refreshToken)
        if(!userData || !tokenFromDb) {
            throw ApiError.UnauthorizedError()
        }

        const user = await UserModule.findById(userData.id)
        const userDto = new UserDto(user)
        const tokens = tokenService.generateTokens({...userDto})

        await tokenService.saveToken(userDto.id, tokens.refreshToken)
        return {...tokens, user: userDto}
    }

    async checkUser(refreshToken) {
        if(!refreshToken) {
            throw ApiError.UnauthorizedError()
        }

        const userData = tokenService.validateRefreshToken(refreshToken)
        const tokenFromDb = await tokenService.findToken(refreshToken)
        if(!userData || !tokenFromDb) {
            throw ApiError.UnauthorizedError()
        }

        const user = await UserModule.findById(userData.id)
        return user
    }

    async
}

module.exports = new UserService()