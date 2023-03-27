from typing import List
import math
from scipy import optimize

# id, latitude, longitude
Location = tuple[int, float, float]

# id, Location
Surveyor = tuple[int, Location]

# surveyor_id, location_id
Assignment = tuple[int, int]

def get_assignments(
        region_centroids: List[Location],
        surveyors: List[Surveyor]
    ) -> List[tuple[Surveyor, Location]]:
    """
    Parameters are a set of surveyors and a set or region_centroids of the same size.
    Output is a mapping between these two sets.
    The ouput is the mapping that minimizes the total distance between each pair.

    Uses the Hungarian Alogorithm implemented by scipy
    https://en.wikipedia.org/wiki/Hungarian_algorithm
    https://docs.scipy.org/doc/scipy/reference/generated/scipy.optimize.linear_sum_assignment.html
    """

    # generate distance matrix
    distance_matrix: List[List[float]] = []
    for surveyor in surveyors:
        surveyor_row = []
        for centroid in region_centroids:
            distance = get_distance(surveyor, centroid)
            surveyor_row.append(distance)
        distance_matrix.append(surveyor_row)

    # get assignment
    # returns a tuple of:
    #     an array of row indices
    #     an array of corresponding column indicies
    raw_assignment: tuple[List[int],List[int]] = optimize.linear_sum_assignment(distance_matrix)


    # format data
    formatted_assignment: List[tuple[Surveyor, Location]] = []
    for x in range(0, len(surveyors)):
        formatted_assignment.append(
            [
                surveyors[raw_assignment[0][x]],
                region_centroids[raw_assignment[1][x]]
            ]
        )

    return formatted_assignment

def get_distance(surveyor:Surveyor, centroid:Location):
    # pythagorean theorum
    return math.sqrt((surveyor[1][1]-centroid[1])**2+(surveyor[1][2]-centroid[2])**2)
