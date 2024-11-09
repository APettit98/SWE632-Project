import random
import json
from datetime import datetime, timedelta
from math import radians, cos, sin, sqrt, atan2

# Approximate flight speed (miles per hour)
FLIGHT_SPEED = 500

# List of cities with their coordinates and airport codes
cities = [
    {"name": "New York", "state": "New York", "stateCode": "NY","code": "JFK", "lat": 40.6413, "lon": -73.7781},
    {"name": "Los Angeles", "state": "California", "stateCode": "CA", "code": "LAX", "lat": 33.9416, "lon": -118.4085},
    {"name": "Chicago", "state": "Illinois", "stateCode": "IL", "code": "ORD", "lat": 41.9742, "lon": -87.9073},
    {"name": "Houston", "state": "Texas", "stateCode": "TX", "code": "IAH", "lat": 29.9902, "lon": -95.3368},
    {"name": "Phoenix", "state": "Arizona", "stateCode": "AZ", "code": "PHX", "lat": 33.4342, "lon": -112.0116},
    {"name": "Philadelphia", "state": "Pennsylvania", "stateCode": "PA", "code": "PHL", "lat": 39.8744, "lon": -75.2424},
    {"name": "San Antonio", "state": "Texas", "stateCode": "TX", "code": "SAT", "lat": 29.5337, "lon": -98.4698},
    {"name": "San Diego", "state": "California", "stateCode": "CA", "code": "SAN", "lat": 32.7338, "lon": -117.1933},
    {"name": "Dallas", "state": "Texas", "stateCode": "TX", "code": "DFW", "lat": 32.8998, "lon": -97.0403},
    {"name": "San Jose", "state": "California", "stateCode": "CA", "code": "SJC", "lat": 37.3639, "lon": -121.9289},
    {"name": "Austin", "state": "Texas", "stateCode": "TX", "code": "AUS", "lat": 30.1975, "lon": -97.6664},
    {"name": "Jacksonville", "state": "Florida", "stateCode": "FL", "code": "JAX", "lat": 30.4941, "lon": -81.6879},
    {"name": "Columbus", "state": "Ohio", "stateCode": "OH", "code": "CMH", "lat": 39.9980, "lon": -82.8919},
    {"name": "Charlotte", "state": "North Carolina", "stateCode": "NC", "code": "CLT", "lat": 35.2140, "lon": -80.9431},
    {"name": "Indianapolis", "state": "Indiana", "stateCode": "IN", "code": "IND", "lat": 39.7173, "lon": -86.2944},
    {"name": "San Francisco", "state": "California", "stateCode": "CA", "code": "SFO", "lat": 37.6213, "lon": -122.3790},
    {"name": "Seattle", "state": "Washington", "stateCode": "WA", "code": "SEA", "lat": 47.4502, "lon": -122.3088},
    {"name": "Denver", "state": "Colorado", "stateCode": "CO", "code": "DEN", "lat": 39.8561, "lon": -104.6737},
    {"name": "Washington", "state": "District of Columbia", "stateCode": "DC", "code": "DCA", "lat": 38.8512, "lon": -77.0402},
    {"name": "Boston", "state": "Massachusettes", "stateCode": "MA", "code": "BOS", "lat": 42.3656, "lon": -71.0096},
    {"name": "El Paso", "state": "Texas", "stateCode": "TX", "code": "ELP", "lat": 31.8075, "lon": -106.3780},
    {"name": "Nashville", "state": "Tennessee", "stateCode": "TN", "code": "BNA", "lat": 36.1263, "lon": -86.6774},
    {"name": "Detroit", "state": "Michigan", "stateCode": "MI", "code": "DTW", "lat": 42.2162, "lon": -83.3554},
    {"name": "Portland", "state": "Oregon", "stateCode": "OR", "code": "PDX", "lat": 45.5898, "lon": -122.5951},
    {"name": "Baltimore", "state": "Maryland", "stateCode": "MD", "code": "BWI", "lat": 39.1774, "lon": -76.6684},
]

# Airlines list
airlines = ["United", "American", "Delta"]

# Days of the week
days_of_week = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]

# Time format
time_format = "%H:%M"

# Haversine formula to calculate distance between two lat/lon pairs
def haversine(lat1, lon1, lat2, lon2):
    R = 3958.8  # Radius of Earth in miles
    dlat = radians(lat2 - lat1)
    dlon = radians(lon2 - lon1)
    a = sin(dlat/2)**2 + cos(radians(lat1)) * cos(radians(lat2)) * sin(dlon/2)**2
    c = 2 * atan2(sqrt(a), sqrt(1 - a))
    distance = R * c
    return distance

# Calculate flight duration based on distance
def get_flight_duration(origin, destination):
    distance = haversine(origin["lat"], origin["lon"], destination["lat"], destination["lon"])
    return int((distance / FLIGHT_SPEED) * 60) + random.randint(-15, 15) # Convert hours to minutes

# Random time generator for departure and arrival times
def generate_time():
    hour = random.randint(5, 22)  # Flight times between 5:00 and 22:00
    minute = random.choice([0, 15, 30, 45])
    return f"{hour:02}:{minute:02}"

# Generate consistent arrival time based on duration
def calculate_arrival_time(departure_time, duration):
    departure_dt = datetime.strptime(departure_time, time_format)
    arrival_dt = departure_dt + timedelta(minutes=duration)
    return arrival_dt.strftime(time_format)

# Generate random flight prices
def generate_prices():
    economy_price = random.randint(100, 500)
    business_price = economy_price + random.randint(300, 500)
    first_price = business_price + random.randint(300, 500)
    return economy_price, business_price, first_price

# Generate unique flight IDs based on airline
airline_id_counters = {
    "American": 1,
    "United": 1,
    "Delta": 1
}

# Helper to generate unique flight ID
def generate_flight_id(airline):
    prefix = airline[0]  # First letter of the airline
    counter = airline_id_counters[airline]
    airline_id_counters[airline] += 1
    return f"{prefix}{counter:05d}"

# Regenerating flights with unique IDs, realistic durations, and corrected time logic
flights_updated = []
flight_count_updated = 0  # Track number of flights

for day in days_of_week:
    for origin in cities:
        for destination in cities:
            if origin != destination:  # No flights to the same city
                for airline in airlines:
                    departure_time = generate_time()
                    duration = get_flight_duration(origin, destination)
                    arrival_time = calculate_arrival_time(departure_time, duration)
                    
                    # Generate flight prices
                    economy_price, business_price, first_price = generate_prices()

                    # Generate unique flight ID
                    flight_id = generate_flight_id(airline)
                    
                    # Create flight with corrected logic and unique ID
                    flight = {
                        "id": flight_id,
                        "date": day,
                        "origin": {"name": origin["name"], "state": origin["state"], "stateCode": origin["stateCode"]},
                        "originCode": origin["code"],
                        "destination": {"name": destination["name"], "state": destination["state"], "stateCode": destination["stateCode"]},
                        "destinationCode": destination["code"],
                        "airline": airline,
                        "departureTime": departure_time,
                        "arrivalTime": arrival_time,
                        "duration": duration,
                        "economyPrice": economy_price,
                        "businessPrice": business_price,
                        "firstPrice": first_price
                    }
                    
                    flights_updated.append(flight)
                    flight_count_updated += 1

# Create updated JSON structure
flight_data_updated = {
    "cities": [city for city in cities],
    "airlines": airlines,
    "bookings": [],
    "bookingCodes": [],
    "flights": flights_updated
}

# Save the updated flight data to a new JSON file
output_file_updated = "flight_data_with_realistic_durations.json"
with open(output_file_updated, "w") as file:
    json.dump(flight_data_updated, file, indent=4)

print(f"Generated {flight_count_updated} flights. Data saved to {output_file_updated}")
