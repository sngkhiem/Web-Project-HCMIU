import com.example.hcmiuweb.entities.*;
import com.example.hcmiuweb.payload.request.*;
import com.example.hcmiuweb.payload.response.*;
import com.example.hcmiuweb.repositories.*;
import com.example.hcmiuweb.security.JwtUtils;
import com.example.hcmiuweb.services.UserDetailsImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.*;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/auth")
public class PingController {

    @GetMapping("/ping")
    public String ping() {
        return "pong";
    }
}