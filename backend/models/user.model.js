const bcrypt = require('bcrypt');
const SALT_ROUNDS = 10;

module.exports = (mongoose) => {
    let schema = mongoose.Schema({
        name: {
            type: String,
            required: true,
            trim: true
        },
        cpf: {
            type: String,
            trim: true,
            unique: true,
            required: true
        },
        email: {
            type: String,
            required: true,
            trim: true,
            unique: true,
            lowercase: true
        },
        password: {
            type: String,
            required: true,
            trim: true
        },
        type: {
            type: String,
            default: 'Usuário Comum'// or Administrador
        },
        status: {
            type: String,
            default: 'Ativo'// or Inativo
        },
        __v: {
            type: Number,
            select: false
        }
    });

    schema.statics.generateHash = function (password) {
        return bcrypt.hashSync(password, bcrypt.genSaltSync(SALT_ROUNDS));
    };

    // Authenticate without save salt on database
    schema.methods.validatePassword = function (password) {
        return bcrypt.compareSync(password, this.password);
    };

    const User = mongoose.model('user', schema);

    return User;
};