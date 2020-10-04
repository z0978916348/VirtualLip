@echo off
echo Setting up enviroment variables...

setx NODE_ENV "development"
setx PG_HOSTNAME "localhost"
setx PG_PORT 5432
setx PG_USERNAME "kevin"
setx PG_PASSWORD "a123"
setx PG_DB_NAME "lipstick"

setx PGHOST "localhost"
setx PGUSER "kevin"
setx PGDATABASE "lipstick"
setx PGPASSWORD "a123"
setx PGPORT 5432


REM echo %NODE_ENV%
REM echo %PG_HOSTNAME%
REM echo %PG_PORT%
REM echo %PG_USERNAME%
REM echo %PG_PASSWORD%
REM echo %PG_DB_NAME%

echo Done