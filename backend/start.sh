#!/bin/bash

rails db:prepare
rails server -b 0.0.0.0
