## Directus CMS Installation

Simply run `docker-compose up -d`

### Notes on GeoSpatial Data

To support Geo data, the Postgres instane needs some work:

Adjust according to your needs

```bash
# Login to pg console
$ psql -h localhost -p 5432 -U directus -W

#Activate extension
$pg CREATE EXTENSION postgis; 
```

### Access
You can expose these ports as needed

```js
// localhost ports from docker images
{
    directus: 8055,
    postgresql: 5432,
    pgadmin: 5050 //be careful about this one
        
}
```