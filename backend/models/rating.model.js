module.exports = (mongoose) => {
    let schema = mongoose.Schema({
        rate: {
            type: Number,
            required: true,
            min: 0,
            max: 10,
            immutable: true
        },
        note: {
            type: String,
            trim: true
        },
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user',
            required: true,
            immutable: true
        },
        accident_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'accident',
            required: true,
            immutable: true
        },
        __v: {
            type: Number,
            select: false
        }
    });

    const Rating = mongoose.model('rating', schema);

    return Rating;
};