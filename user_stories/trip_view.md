# Detailed View

When the user clicks on a trip card, a detailed view of that trip will appear. On the trip detail page they are presented a map of the starting, ending location, and route. The other half of the screen will contain detailed trip data. 

The same bar charts that were introduced on the [home page](home.md) will be shown. Below that they will be shown a pie chart that breaks down the cost of the trip. Currently Uber charges for UberX using the following equation:

* Base fare: $2
* Per Minute: $0.20
* Per Mile: $1.24
* Cancellation: $5
* Service Fees: $1.35
* Minimum Fare: $6.35

The pie chart will show the user the breakdown of those different categories. If they cancelled their trip and were charged a cancellation fee, it will be the only thing in the pie chart.

Immediately below this cost pie chart, we will display alternative means of transport that the user could have taken. This will include estimates of public transit cost and time, accompied by a percent difference in time and price. We will also include Lyft and other relevant transit oppurtunities.

Should we fail to retreive this data, we will write N/A in the location that the data would have otherwise been.

