
// Calculate cost of uber ride
function cost_calculator(service, start_time, end_time, miles){
	var min_fare = 0
	var base_fare = 0
	var cost_p_min = 0.15
	var cost_p_mile = 0.90
	var booking_fee = 0
	if (service == "uberX"){
		min_fare = 5.15
		booking_fee = 1.65
	}
	else if (service == "uberXL"){
		base_fare = 1.0
		min_fare = 7.65
		cost_p_min = 0.30
		cost_p_mile = 1.55
		booking_fee = 1.65
	}
	else if (service == "uberSelect"){
		base_fare = 5.0
		min_fare = 10.65
		cost_p_min = 0.40
		cost_p_mile = 2.35
		booking_fee = 1.65
	}
	else if (service == "uberBlack"){
		base_fare = 8.0
		min_fare = 15.0
		cost_p_min = 0.45
		cost_p_mile = 3.55
		booking_fee = 0.0
	}
	else if (service == "uberSUV"){
		base_fare = 15.0
		min_fare = 25.0
		cost_p_min = 0.55
		cost_p_mile = 4.25
		booking_fee = 0.0
	}
	else if (service == "uberPOOL"){
		base_fare = 1.5
		min_fare = 2.75
		cost_p_min = 0.10
		cost_p_mile = 0.70
		booking_fee = 0.0
	}
	else{
		return 0
	}

	var cost = (base_fare + (cost_p_min * (end_time-start_time) / 60.0) + (cost_p_mile * miles) + booking_fee)

	if (cost<min_fare){
		return min_fare
	}
	else{
		return cost
	}
}

module.exports = {
	'cost_calculator': cost_calculator
}