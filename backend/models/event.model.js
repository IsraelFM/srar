module.exports = (mongoose) => {
    let schema = mongoose.Schema({
        track_situation: { // Interditada, Congestionada, Fluxo Livre
            type: String,
            required: true,
            trim: true
        },
        track_type: { // Pavimentada, Não Pavimentada
            type: String,
            required: true,
            trim: true
        },
        measures_taken: {
            type: String,
            trim: true
        },
        __v: {
            type: Number,
            select: false
        }
    });

    const Event = mongoose.model('event', schema);

    return Event;
};