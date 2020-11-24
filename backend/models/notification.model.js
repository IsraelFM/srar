module.exports = (mongoose) => {
    let schema = mongoose.Schema({
        description: {
            type: String,
            trim: true
        },
        status: {
            type: String,
            trim: true,
            required: true,
            default: 'Ativado' // Desativado
        },
        name: {
            type: String,
            trim: true,
            required: true
        },
        resource: {// Área de Risco, Velocímetro
            type: String,
            trim: true,
            required: true
        },
        resource_specification: { // (<= ou < ou = ou > ou >=) (valor numérico). Ex.: >= 10
            type: String,
            trim: true,
            required: true
        },
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user',
            required: true
        },
        __v: {
            type: Number,
            select: false
        }
    });

    const Notification = mongoose.model('notification', schema);

    return Notification;
};