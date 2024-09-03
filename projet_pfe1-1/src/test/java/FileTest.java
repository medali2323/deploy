

import java.io.IOException;
import java.io.InputStream;

import org.junit.Test;
import org.junit.jupiter.api.Assertions;



public class FileTest {

    @Test
    public void testReadFile() {
        // Chemin vers le fichier client_secret.json
        String path = "/client_secret.json";
        
        // Obtenir le flux d'entrée du fichier
        try (InputStream inputStream = getClass().getResourceAsStream(path)) {
            // Vérifier si le flux d'entrée n'est pas null
            Assertions.assertNotNull(inputStream, "Le fichier client_secret.json n'a pas été trouvé.");

            // Le fichier peut être lu avec succès
            System.out.println("Le fichier client_secret.json a été trouvé et peut être lu.");
        } catch (IOException e) {
            // Une exception s'est produite lors de la lecture du fichier
            Assertions.fail("Une erreur s'est produite lors de la lecture du fichier : " + e.getMessage());
        }
    }
}
