import csv

def convert_age_string_to_num(age_strg):
    return int(age_strg)

def convert_data_to_csv_rows(data):
    return [list(datum.values()) for datum in data]

def csv_to_data_set(filename):
    fieldnames = ['first_name', 'last_name', 'age', 'state']
    rows = []

    with open(filename, 'r') as csv_file:
        reader = csv.DictReader(csv_file, fieldnames)

        for row in reader:
            
            # Removes the header and ensures the data is valid before inserting it into the data_set
            if valid(row):
                rows.append(row)

    return rows

def intersection(first_data_set, second_data_set):
    unique_members_first_set = {}
    unique_members_second_set = {}
    intersecting_set = []

    # This is also O(n), but it takes up more space than the TypeScript implementation
    # because we're creating 2 dictionaries. Would likely start to run faster than the 
    # TypeScript version for high values of n
    for datum in first_data_set:
        uniq_id = ('').join(list(datum.values()))

        if unique_members_first_set.get(uniq_id) == None:
            unique_members_first_set[uniq_id] = datum

    for datum in second_data_set:
        uniq_id = ('').join(list(datum.values()))

        if unique_members_second_set.get(uniq_id) == None:
            unique_members_second_set[uniq_id] = datum

    for k, v in unique_members_first_set.items():
        if unique_members_second_set.get(k) != None:
            intersecting_set.append(v)

    return intersecting_set

def print_intersection(intersection, fileName=None):
    if fileName == None:
        print('Customers that are in both lists: ', intersection)
    else: 
        csv_rows = convert_data_to_csv_rows(intersection)

        with open(fileName, 'w', newline='') as csv_file:
            writer = csv.writer(csv_file, dialect='excel')
            writer.writerows(csv_rows)

        print('Customers saved to: ', fileName)

# VALIDATION

def valid(datum):
    return all(valid_string(datum.get(key)) for key in ['first_name', 'last_name', 'state']) and valid_age(datum.get('age'))

# Make sure it's a number and that it is greater than 0
def valid_age(poss_num):
    return poss_num.isdigit() and (int(poss_num) > 0)

# Make sure it's a string and that it is not empty
def valid_string(poss_strg):
    return isinstance(poss_strg, str) and (len(poss_strg.strip()) > 0)
