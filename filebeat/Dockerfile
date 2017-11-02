FROM docker.elastic.co/beats/filebeat:5.6.2
COPY wait-for-it.sh wait-for-it.sh
COPY filebeat.yml /usr/share/filebeat/filebeat.yml
USER root
RUN chown filebeat /usr/share/filebeat/filebeat.yml
USER filebeat