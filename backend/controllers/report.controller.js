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

exports.region = async (req, res) => {
    let groupProjection = [
        {
            $group: {
                _id: '$region',
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
                region: '$_id',
                count: 1
            }
        }
    ];

    const centeredCoordinatesByRegion = ({ region } = {}) => {
        let coordinates;
    
        switch (region) {
            case 'Nordeste':
                coordinates = ['-41.731500021229','-8.64188671159911'];
                break;
            case 'Sudeste':
                coordinates = ['-45.4738081749615', '-19.7395013632923'];
                break;
            case 'Centro-Oeste':
                coordinates = ['-54.2681574192833', '-15.3089138536273']
                break;
            case 'Sul':
                coordinates = ['-52.2566668751902', '-27.5767016130347']
                break;
            case 'Norte':
                coordinates = ['-59.2717890716893', '-4.62036046884528']
                break;
        }
    
        return coordinates;
    }

    let projectionWithoutCoordinates = await Accident.aggregate(groupProjection);

    let regions = projectionWithoutCoordinates.map(projection => {
        return {
            ...projection,
            coordinates: centeredCoordinatesByRegion({ region: projection.region })
        }
    });

    res.status(200).send(regions);
};