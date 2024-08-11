person can send a list of params that filters a list of users by giving:

- fav color
- distance
- origin (long, lag coordinates)
- min age
- max age

Return any users that match params given.

Need to find any locations that fall within the distance (radius?) of
the origin point given

Users table contains:

- id
- name
- age
- fav color
- last location
- long
- lat

Steps:

# DB

1. create postgres db
   `createdb fsCodingChallenge`

2. create users and locations table

- Based on the given users.csv data, created 2 table schemas: users, locations
- Created a temporary table to hold all the original data
- Insert the appropriate user and location data into correct tables
- defined the DB schema within fsCodingChallenge.sql
- created the table within psql

3. load csv file into users table

Run this command to update the db:
`psql -f fsCodingChallenge.sql fsCodingChallenge`

# API

How to make a get request with filtering?

user will fill out form
form values are added into the req.query
{
fav_color: "red",
min_age: 21,
max_age: 45
}

i need to take the values within the req.query object and:
search in the DB

for every key in req.query, generate a where clause

How do separate out the user values from the location values?
can check for object keys...

# Form

Upon form submit, it will auto append query values to the URL
