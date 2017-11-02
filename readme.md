# elk-poc

An environment for getting to know [the elastic stack (aka ELK and friends)](https://www.elastic.co/products)

## Prerequisites
* docker (with docker-compose) (tested on 17.09.0-ce-win33 and 17.09.0-ce-mac35)
* node 6.x or greater

## Whats in the box?

This environment consists of 5 containers.  
 * elk (elasticsearch, logstash and kibana)    
 * filebeat (with an example log waiting to be shipped)  
 * dnc-app (a dotnet core web application logging to logstash over tcp)   
 * node-app (a node.js web application logging to logstash over tcp)    
 * go-app (a go web application logging to logstash over tcp)    

It also contains a node script (exercise.js) that sends requests to the example 
web applications.

Logstash receives logs, either directly over tcp from the web applications or from filebeat (tailing logfiles of some sort). Logstash can via filters process the logs before outputing to, for example, elasticsearch. In this pre-cooked environment tcp input will be directly forwarded to elasticsearch and input from filebeat will first be restructured with [grok](https://www.elastic.co/guide/en/logstash/current/plugins-filters-grok.html).

docker-compose will spin up everything and handle networking and data volumes.  

## Do the drills
when you have cloned this repository, follow the steps below.  
1) run npm install in the root folder (elk-poc)  
2) in elk-poc/filebeat create a folder called **logs**  
3) run ```docker compose up```  
4) when compose is running the environment navigate to localhost:5601 (this is your Kibana instance).  
docker  will pull down a lot of stuff the first time around, so have patience   
5) when prompted to create an index pattern: ```logstash-*``` hit the create button  
6) now navigate to the discover page (top item in menu to the left in Kibana)  
7) add a star in the search field and hit enter (you should see 3 entries, one per example app connecting..)  
8) now you can run exercise.js (in the root folder) ``` node exercise.js ```   
let it run for a couple of seconds and then stop it (ctrl + c)  
9) head back to kibana and the discover view, again search with just a *  
(you should now see entries from our 3 example applications)  
10) now to see filebeat in action: rename example-log.txt (in elk-poc/filebeat/) to example-log.log and move it to **elkpoc/filebeat/logs**  
11) head back to kibana and the discover page, search for * a couple of times (or set it to auto update every 5 seconds or something)   
you should eventually have 2000 more entries, these were shipped by filebeats from example-log.log and transformed by the logstash filter grok, see **/elk/logstash-custom.conf**. 


**to reset this environment** do the following (while standing in the root /elk-poc folder):  
* docker-compose stop  (stop all the containers)  
* docker-compose rm  (remove all the containers)    
* docker volume rm elkpoc_elkvol (remove the data volume)    
* docker-compose up --build --force-recreate  

## License

Released under the MIT license. Copyright (c) 2017 Johan Hellgren.

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.