import os
import csv
import unittest
import compare
from unittest.mock import call, patch

invalid_file = 'invalid_file.csv'
valid_file = 'valid.csv'
valid_file_with_invalid_entries = 'valid_file_with_invalid_entries.csv'
invalid_rows = [
    ['0a', '0b', '0c'],
    ['1a', '1b', '1c'],
]
valid_rows = [
    ['A', 'P', '8', 'NY'],
    ['J', 'R', '7', 'LA'],
]
valid_csv_result = [
    {'first_name': 'A', 'last_name': 'P', 'age': '8', 'state': 'NY'},
    {'first_name': 'J', 'last_name': 'R', 'age': '7', 'state': 'LA'}
]
valid_with_invalid_rows = invalid_rows + valid_rows
setup_list = [[invalid_file, invalid_rows], [valid_file, valid_rows], [valid_file_with_invalid_entries, valid_with_invalid_rows]]

class TestCompare(unittest.TestCase):
    def setUp(self):
        # Sets up CSVs
        for [csv_file_name, csv_rows] in setup_list:
            with open(csv_file_name, 'w', newline='') as csv_file:
                writer = csv.writer(csv_file, dialect='excel')
                writer.writerows(csv_rows)

        # Sets up Text file
        with open('text.txt', 'w') as f:
            f.write('A, B, 8, D')

    def tearDown(self):
        os.remove(invalid_file)
        os.remove(valid_file)
        os.remove(valid_file_with_invalid_entries)
        os.remove('text.txt')

    def test_convert_data_to_csv_rows(self):
        self.assertCountEqual(compare.convert_data_to_csv_rows(valid_csv_result), valid_rows)
        self.assertEqual(sorted(compare.convert_data_to_csv_rows(valid_csv_result)), sorted(valid_rows))

    def test_convert_age_string_to_num(self):
        self.assertEqual(compare.convert_age_string_to_num("-5"), -5)
        self.assertEqual(compare.convert_age_string_to_num("0"), 0)
        self.assertEqual(compare.convert_age_string_to_num("11"), 11)

    def test_csv_to_data_set(self):
        # Given a file name, will generate a list of dictionaries 
        # with the keys first_name, last_name, age, state
        
        # File not found
        with self.assertRaises(Exception) as context:
            compare.csv_to_data_set('unknown_file')

        self.assertIsInstance(context.exception, FileNotFoundError)

        # File not right type
        self.assertEqual(compare.csv_to_data_set('text.txt'), [])

        # Invalid file
        self.assertEqual(compare.csv_to_data_set(invalid_file), [])

        # Valid file with invalid entries
        self.assertEqual(compare.csv_to_data_set(valid_file_with_invalid_entries), valid_csv_result)

        # Valid file
        self.assertEqual(compare.csv_to_data_set(valid_file), valid_csv_result)

    def test_intersection(self):
        empty_set = []
        data_set_1 = [
            {'first_name': 'A', 'last_name': 'P', 'age': '8', 'state': 'NY'},
            {'first_name': 'J', 'last_name': 'R', 'age': '7', 'state': 'LA'}
        ]
        data_set_2 = [
            {'first_name': 'A', 'last_name': 'P', 'age': '8', 'state': 'NY'},
            {'first_name': 'J', 'last_name': 'R', 'age': '7', 'state': 'LA'},
            {'first_name': 'B', 'last_name': 'C', 'age': '7', 'state': 'FL'},
        ]
        data_set_3 = [
            {'first_name': 'B', 'last_name': 'C', 'age': '7', 'state': 'FL'},
            {'first_name': 'Z', 'last_name': 'C', 'age': '10', 'state': 'FL'},
        ]
        non_intersecting_data_set = [{'first_name': 'R', 'last_name': 'R', 'age': '7', 'state': 'LA'}]
        intersecting_data_set_2_3 = [
            {'first_name': 'B', 'last_name': 'C', 'age': '7', 'state': 'FL'}
        ]

        result = compare.intersection(data_set_1, empty_set)
        self.assertCountEqual(compare.intersection(data_set_1, empty_set), empty_set)
        self.assertEqual(sorted(result, key = lambda ele: sorted(ele.items())), sorted(empty_set, key = lambda ele: sorted(ele.items())))
        
        result = compare.intersection(data_set_1, non_intersecting_data_set)
        self.assertCountEqual(compare.intersection(data_set_1, non_intersecting_data_set), empty_set)
        self.assertEqual(sorted(result, key = lambda ele: sorted(ele.items())), sorted(empty_set, key = lambda ele: sorted(ele.items())))
        
        result = compare.intersection(data_set_1, data_set_2)
        self.assertCountEqual(compare.intersection(data_set_1, data_set_2), data_set_1)
        self.assertEqual(sorted(result, key = lambda ele: sorted(ele.items())), sorted(data_set_1, key = lambda ele: sorted(ele.items())))
        
        result = compare.intersection(data_set_1, data_set_3)
        self.assertCountEqual(compare.intersection(data_set_1, data_set_3), empty_set)
        self.assertEqual(sorted(result, key = lambda ele: sorted(ele.items())), sorted(empty_set, key = lambda ele: sorted(ele.items())))
        
        result = compare.intersection(data_set_2, data_set_3)
        self.assertCountEqual(compare.intersection(data_set_2, data_set_3), intersecting_data_set_2_3)
        self.assertEqual(sorted(result, key = lambda ele: sorted(ele.items())), sorted(intersecting_data_set_2_3, key = lambda ele: sorted(ele.items())))
        
    @patch('compare.convert_data_to_csv_rows')
    @patch('csv.writer')
    @patch('builtins.print')
    def test_print_intersection(self, mock_print, mock_write, mock_convert):
        intersection = valid_csv_result

        # Without a filename, it prints the provided data to the console
        compare.print_intersection(intersection)
        mock_print.assert_called_with('Customers that are in both lists: ', intersection)
        mock_write.assert_not_called()
        mock_convert.assert_not_called()

        # RESET MOCKS
        mock_print.reset_mock()
        mock_write.reset_mock()
        mock_convert.reset_mock()

        # With a filename, it saves the intersection to a file
        compare.print_intersection(intersection, fileName='file.csv')
        mock_print.assert_not_called()
        mock_convert.assert_called_with(intersection)
        mock_write.assert_called()

        
    def test_valid(self):
        invalid_bad_string = {'first_name': '', 'last_name': 'P', 'age': '28', 'state': 'Hawaii'}
        invalid_bad_age = {'first_name': 'A', 'last_name': 'P', 'age': '-1', 'state': 'Hawaii'}
        valid = {'first_name': 'A', 'last_name': 'P', 'age': '40', 'state': 'Hawaii'}

        self.assertEqual(compare.valid(invalid_bad_string), False)
        self.assertEqual(compare.valid(invalid_bad_age), False)
        self.assertEqual(compare.valid(valid), True)

        self.valid_calls(invalid_bad_string, single_call=invalid_bad_string['first_name'])
        self.valid_calls(invalid_bad_age)
        self.valid_calls(valid)

    def test_valid_age(self):
        self.assertEqual(compare.valid_age(""), False)
        self.assertEqual(compare.valid_age("a"), False)
        self.assertEqual(compare.valid_age("-1"), False)
        self.assertEqual(compare.valid_age("16"), True)

    def test_valid_string(self):
        self.assertEqual(compare.valid_string(5), False)
        self.assertEqual(compare.valid_string(""), False)
        self.assertEqual(compare.valid_string("a"), True)        

    def valid_calls(self, datum, single_call=None):
        compare_double = compare

        with patch.object(compare, 'valid_string', wraps=compare_double.valid_string) as valid_string_mock, \
          patch.object(compare, 'valid_age', wraps=compare_double.valid_age) as valid_age_mock:
            compare.valid(datum)

            if single_call != None:
              valid_string_mock.assert_has_calls(single_call)
            else:
              calls = self.valid_string_calls_helper(datum)
              valid_string_mock.assert_has_calls(calls)
              valid_age_mock.assert_called_once_with(datum['age'])

    def valid_string_calls_helper(self, datum):
        return map(lambda key: call(datum[key]), ['first_name', 'last_name', 'state'])
        
if __name__ == '__main__':
    unittest.main()
