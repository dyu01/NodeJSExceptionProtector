### NodeJSExceptionProtector
It's a anti-pattern to throw exception in javascript callback, which will cause unexpected behavior at runtime.
However, it's also common to have runtime exception in callback. For instance, in cassandra nodejs driver, if 
there is exception in callback of a database client.execute, you nodejs app will freeze at any on-going database
query.

NodeJSExceptionProtector is a simple wrapper to protect exceptions in callback in nodejs, especially for cassandra 
nodejd driver. 

#Sample:

.... <br/>
var cassandra = require('cassandra-driver');<br/>
var ep = require('./exceptionProtector');<br/>
client = new cassandra.Client({contactPoints: LOCAL_HOST, keyspace: 'mykeyspace'});<br/>
client.execute = ep.toSafeCallback(client.execute);<br/>
client.execute = ep.toSafeCallback(client.batch);<br/>
... <br/>


