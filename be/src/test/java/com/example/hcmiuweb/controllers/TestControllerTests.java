import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;

import com.example.hcmiuweb.HcmiuWebApplication;
import com.example.hcmiuweb.controllers.TestController;

@WebMvcTest(TestController.class) // Specify the controller class explicitly
@ContextConfiguration(classes = HcmiuWebApplication.class)
public class TestControllerTests {

    @Autowired
    private MockMvc mockMvc;

    @Test
    @WithMockUser // This annotation mocks a logged-in user for the test
    public void testGetEndpoint() throws Exception {
        mockMvc.perform(get("/api/test")) // Use the actual endpoint path from your TestController
                .andExpect(status().isOk())
                .andExpect(content().string("Backend is working!"));
    }
}