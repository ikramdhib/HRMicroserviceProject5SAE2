FROM openjdk:17
EXPOSE 8090
ADD target/APIGateway-0.0.1-SNAPSHOT.jar apigateway.jar
ENTRYPOINT ["java","-jar","apigateway.jar"]