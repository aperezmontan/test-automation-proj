from compare import csv_to_data_set, intersection, print_intersection
import sys

argument_list = []
first_file = None
second_file = None
output_file = None

for i in range(1, len(sys.argv[:4])):
    argument_list.append(sys.argv[i].strip())

if len(argument_list) == 3:
    [first_file, second_file, output_file] = argument_list
elif len(argument_list) == 2:
    [first_file, second_file] = argument_list
elif len(argument_list) == 1:
    [first_file] = argument_list
else: 
    None

first_data_set = csv_to_data_set(first_file or 'Store1.csv')
second_data_set = csv_to_data_set(second_file or 'Store2.csv')
intersecting_members = intersection(first_data_set, second_data_set)
print_intersection(intersecting_members, output_file)
