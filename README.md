Dependencies
============
* node.io
* redis
* hiredis
* restify

Consuming The Webservice
========================

`/friends` : Return all friends

`/friend/[gamertag]` : Return data for a single gamertag. e.g. /friend/Jabbslad

`/friends/online/[true|false]` : Return friends with a matching online status. e.g. /friends/online/true

