import csv

def convert_age_string_to_num(age_strg):
    return int(age_strg)

def csv_to_data_set(filename):
    fieldnames = ['first_name', 'last_name', 'age', 'state']
    rows = []

    with open(filename, 'r') as csv_file:
        reader = csv.DictReader(csv_file, fieldnames)

        for index, row in enumerate(reader):
            
            # Removes the header and ensures the data is valid before inserting it into the data_set
            if index > 0 and valid(row):
                rows.append(row)

    return rows

# VALIDATION

def valid(datum):
    return all(valid_string(datum.get(key)) for key in ['first_name', 'last_name', 'state']) and valid_age(datum.get('age'))

# Make sure it's a number and that it is greater than 0
def valid_age(poss_num):
    return poss_num.isdigit() and (int(poss_num) > 0)

# Make sure it's a string and that it is not empty
def valid_string(poss_strg):
    return isinstance(poss_strg, str) and (len(poss_strg.strip()) > 0)

# first_data_set = csv_to_data_set('Store1.csv')
# second_data_set = csv_to_data_set('Store2.csv')

# print(first_data_set)
