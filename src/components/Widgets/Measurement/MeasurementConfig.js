const measurementconfig= {
    measurement : {
        area: {
            unitOptions: ["Sq.Meters", "Sq.kilometers", "Sq.Miles", "Sq.Feet", "Hectares"]
        },
        distance: {
            unitOptions: ["Meters", "Kilometers", "Miles", "Feet", "Nautical Miles"]
        }
    },
    coordinateSystem : {
        wgs84: {
            spRef: 4326,
            units: [
                {
                    key: "dd",
                    label: "Decimal Degress"
                },
                {
                    key: "dms",
                    label: "DMS"
                }
            ]
        },
        utm39N: {
            spRef: 32639
        },
        utm40N: {
            spRef: 32640
        }
    }
}

export default measurementconfig
