module.exports = (mongoose) => {
    let schema = mongoose.Schema({
        date_hour_start: {
            type: Date,
            required: true
        },
        to_address: { // start_address (Google API)
            type: String,
            trim: true,
            required: true
        },
        from_address: { // end_address (Google API)
            type: String,
            trim: true,
            required: true
        },
        estimated_duration: { // duration.text (Google API)
            type: String,
            trim: true
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

    const Route = mongoose.model('route', schema);

    return Route;
};