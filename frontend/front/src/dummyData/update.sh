curl http://localhost:3000/surveyors.json | jq . --indent 4 > surveyors_index.json
curl http://localhost:3000/surveyors.json | jq '.[0]' --indent 4 > surveyors_show.json
curl http://localhost:3000/assignments.json | jq . --indent 4 > assignments_index.json
curl http://localhost:3000/assignments.json | jq '.[0]' --indent 4 > assignments_show.json
curl http://localhost:3000/homes.json | jq . --indent 4 > homes_index.json
curl http://localhost:3000/homes.json | jq '.[0]' --indent 4 > homes_show.json
