# Build stage
FROM maven:3.8.3-openjdk-17 AS build
WORKDIR /build
COPY pom.xml .
COPY src ./src
RUN mvn clean package -DskipTests

# Runtime stage
FROM amazoncorretto:17
WORKDIR /app
COPY --from=build /build/target/projet_pfe-*.jar /app/
EXPOSE 8082

ENTRYPOINT ["java","-jar","projet_pfe-*.jar"]