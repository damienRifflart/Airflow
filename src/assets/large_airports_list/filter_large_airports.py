import csv
import json

# Csv file downloaded from https://ourairports.com/data/
# Data from Feb 25, 2026
input_file = 'airports_Feb25_2026.csv'
output_file = 'large_airports.json'

airports = []

with open(input_file, mode='r', encoding='utf-8') as f:
    reader = csv.DictReader(f)
    for row in reader:
        if row['type'] == 'large_airport':
            airports.append({
                "icao": row['icao_code'],
                "name": row['name'],
                "city": row['municipality']
            })

with open(output_file, 'w', encoding='utf-8') as f:
    json.dump(airports, f, indent=2, ensure_ascii=False)

print(f"{len(airports)} airports extracted in {output_file}")