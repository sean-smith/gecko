```

// year, make and model uniquely identify an object. 
// _id can also be used to uniquely identify an object. 


{
    "_id": "58e13b30c8a12d6c907efd4c", // unique id for each document
    "year": "2013",                    // year of the car 
    "make": "honda",                   // make of the car
    "model": "fit",                    // model of the car, combined the year, make and model form a unique key for each document
    "mpg": { 			// this is returned by the EPA API. 
        "avgMpg": "34.250739655", // average for both city + highway
        "cityPercent": "55",      // percentage used to calculate average
        "highwayPercent": "45",   // "..."
        "maxMpg": "37",           // Max mpg
        "minMpg": "32",           // Min mpg
        "recordCount": "2",       // Number of records for this car
        "vehicleId": "33275"      // Unique car id, used for future api lookups
    }
}

```
