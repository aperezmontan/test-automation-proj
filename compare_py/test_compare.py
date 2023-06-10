import compare
import unittest
from unittest.mock import call, patch

class TestCompare(unittest.TestCase):
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

        # Invalid file

        # Valid file with invalid entries



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
