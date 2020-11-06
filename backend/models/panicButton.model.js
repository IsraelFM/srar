module.exports = (mongoose) => {
    let pointGeo = {
        type: {
            type: String,
            enum: ['Point'],
            required: true
        },
        coordinates: {
            type: [Number],
            required: true
        }
    };

    let schema = mongoose.Schema({
        date_hour: {
            type: Date,
            required: true,
        },
        location: pointGeo,
        status: {
            type: String,
            required: true,
            trim: true,
            default: 'Em andamento' // Encerrado, Engano
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
    schema.index({ location: '2dsphere' });

    const PanicButton = mongoose.model('panic_button', schema);

    return PanicButton;
};