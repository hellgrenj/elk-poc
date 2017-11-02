FROM sebp/elk

# overwrite configuration
ADD ./logstash-custom.conf /etc/logstash/conf.d/logstash-custom.conf

# overwrite post hook
ADD ./elk-post-hooks.sh /usr/local/bin/elk-post-hooks.sh

# install the logstash filter grok
RUN gosu logstash /opt/logstash/bin/logstash-plugin install logstash-filter-grok

RUN ["chmod", "+x", "/usr/local/bin/elk-post-hooks.sh"]

