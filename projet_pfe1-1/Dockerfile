# Build stage
FROM maven:3.8.3-openjdk-17 AS build
WORKDIR /build
COPY pom.xml .
RUN mvn dependency:go-offline
COPY src ./src
RUN mvn clean package -Dmaven.test.skip=true

# Runtime stage
FROM amazoncorretto:17
WORKDIR /app
COPY --from=build /build/target/projet_pfe-*.jar /app/app.jar
EXPOSE 8082

# Environment variable for database URL
ENV DB_URL=jdbc:mysql://mysql:3306/zengym

# Correct order of arguments for java command
ENTRYPOINT ["java", "-Dspring.datasource.url=${DB_URL}", "-jar", "/app/app.jar"]
