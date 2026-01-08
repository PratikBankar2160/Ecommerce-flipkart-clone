package jwt_ecommerce.Service;

import jwt_ecommerce.DTO.LoginRequest;
import jwt_ecommerce.DTO.RegisterRequest;
import jwt_ecommerce.Entity.User;
import jwt_ecommerce.Repository.UserRepository;
import jwt_ecommerce.Util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtil jwtUtil;

    public String register(RegisterRequest request) {

        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new RuntimeException("Email already exists");
        }

        User user = new User();
        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));

        // 🔒 Role validation
        if (!request.getRole().equals("USER") && !request.getRole().equals("SELLER")) {
            throw new RuntimeException("Invalid role");
        }

        user.setRole(request.getRole());

        userRepository.save(user);
        return "User registered successfully";
    }

    public String login(LoginRequest request) {

        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new RuntimeException("Invalid password");
        }

        return jwtUtil.generateToken(user.getEmail(), user.getRole());
    }
}
