FROM microsoft/dotnet:2.0-sdk
COPY . /app/src/
WORKDIR /app/src
RUN ["dotnet", "restore"]
RUN ["dotnet", "build"]
EXPOSE 5002
ENV ASPNETCORE_URLS http://*:5002
ENTRYPOINT ["dotnet", "run"]
