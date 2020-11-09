module.exports = (mongoose) => {
    let schema = mongoose.Schema({
        year: {
            type: String,
            required: true,
            trim: true
        },
        license_plate: {
            type: String,
            required: true,
            trim: true
        },
        renavam: {
            type: String,
            required: true,
            trim: true
        },
        brand: {
            type: String,
            required: true,
            trim: true
        },
        chassi: {
            type: String,
            trim: true
        },
        fuel: {
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

    const Vehicle = mongoose.model('vehicle', schema);

    return Vehicle;
};