package jwt_ecommerce.Controller;

import jwt_ecommerce.DTO.CategoryHomeDTO;
import jwt_ecommerce.Entity.Category;
import jwt_ecommerce.Service.CategoryService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/categories")
@CrossOrigin("*")
public class CategoryController {

    private final CategoryService service;

    public CategoryController(CategoryService service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<?> addCategory(@RequestBody Category category) {
        Category saved = service.addCategory(category);
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(saved);
    }

    @GetMapping
    public ResponseEntity<?> getAllCategories() {
        List<Category> categories = service.getAllCategories();

        if (categories.isEmpty()) {
            return ResponseEntity
                    .status(HttpStatus.NOT_FOUND)
                    .body("No categories found");
        }

        return ResponseEntity.ok(categories);
    }

    @GetMapping("/home")
    public List<CategoryHomeDTO> getCategoriesForHome() {
        return service.getCategoriesForHome();
    }
}
