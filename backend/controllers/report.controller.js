const db = require('../models')
const Accident = db.accident;

exports.ranking = async (req, res) => {
    const DECIMAL_PLACES = 2;
    const TOTAL_DOCUMENTS = await Accident.countDocuments();

    const preparesGroupProjection = ({ field } = {}) => {
        return [
            {
                $group: {
                    _id: `$${field}`,
                    count: {
                        $sum: 1
                    }
                }
            },
            {
                $sort: {
                    count: 1
                }
            },
            {
                $project: {
                    _id: 0,
                    [field]: '$_id',
                    count: 1,
                    percent: {
                        $concat: [
                            {
                                $toString: {
                                    $round: [
                                        { 
                                            $divide: [
                                                {
                                                    $multiply: [100, '$count']
                                                },
                                                TOTAL_DOCUMENTS
                                            ]
                                        },
                                        DECIMAL_PLACES
                                    ]
                                }
                            },
                            '%'
                        ]
                    },
                }
            }
        ];
    };

    let types = await Accident.aggregate(preparesGroupProjection({field: 'type'}));

    let shifts = await Accident.aggregate(preparesGroupProjection({field: 'shift'}));

    let regions = await Accident.aggregate(preparesGroupProjection({field: 'region'}));

    res.status(200).send({
        types,
        shifts,
        regions
    });
};