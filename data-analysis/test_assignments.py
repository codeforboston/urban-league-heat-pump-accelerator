from typing import List
import unittest
from assignments import get_assignments

# id, latitude, longitude
Location = tuple[int, float, float]

# id, Location
Surveyor = tuple[int, Location]

# surveyor_id, location_id
Assignment = tuple[int, int]

class TestAssignments(unittest.TestCase):

    def test_assignment(self):
        # mock surveyors
        surveyors: List[Surveyor] = [
            [101, [1, 3.0, 3.0]],
            [102, [2, 5.0, 5.0]],
            [103, [3, 7.0, 7.0]],
        ]

        # mock region centroids
        mock_centroids: List[Location] = [
            [4, 3.1, 3.1],
            [5, 5.1, 5.1],
            [6, 7.1, 7.1],
        ]

        expected: List[tuple[Surveyor, Location]] = [
            [
                [101, [1, 3.0, 3.0]],
                [4, 3.1, 3.1],
            ],
            [
                [102, [2, 5.0, 5.0]],
                [5, 5.1, 5.1],
            ],
            [
                [103, [3, 7.0, 7.0]],
                [6, 7.1, 7.1],
            ],
        ]

        actual: List[tuple[Surveyor, Location]] = get_assignments(mock_centroids, surveyors)

        assert expected == actual

if __name__ == '__main__':
    unittest.main()
