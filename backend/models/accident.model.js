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
        involved_number: Number,
        location: pointGeo,
        region: { // Nordeste, Centro-oeste, Sul, Norte, Sudeste
            type: String,
            required: true,
            trim: true
        },
        type: { // Colisão frontal, Colisão lateral, Colisão traseira, Atropelamento, Outro
            type: String,
            required: true,
            trim: true
        },
        shift: { // Amanhecer, Anoitecer, Dia, Noite
            type: String,
            required: true,
            trim: true
        },
        event_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'event'
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

    const Accident = mongoose.model('accident', schema);

    return Accident;
};