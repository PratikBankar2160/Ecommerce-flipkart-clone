package jwt_ecommerce.Service;

import jwt_ecommerce.Entity.Category;
import jwt_ecommerce.Entity.Product;
import jwt_ecommerce.Repository.CategoryRepository;
import jwt_ecommerce.Repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;


import org.springframework.web.multipart.MultipartFile;

@Service
public class ProductService {

    private final ProductRepository repo;

    public ProductService(ProductRepository repo) {
        this.repo = repo;
    }

    @Autowired
    private CategoryRepository categoryRepo;

//    public Product addProduct(Product product) {
//        return repo.save(product);
//    }

//    public Product saveProduct(Product product) {
//        Long catId = product.getCategory().getId();
//
//        Category category = categoryRepo.findById(catId)
//                .orElseThrow(() -> new RuntimeException("Category not found"));
//
//        product.setCategory(category);
//        return repo.save(product);
//    }

    public Product saveProduct(
            String name,
            String description,
            double price,
            Double oldPrice,
            int quantity,
            String brand,
            Long categoryId,
            MultipartFile image
    ) throws IOException {

        // 🔹 fetch category
        Category category = categoryRepo.findById(categoryId)
                .orElseThrow(() -> new RuntimeException("Category not found"));

        // 🔹 save image locally
        String fileName = System.currentTimeMillis() + "_" + image.getOriginalFilename();
        Path uploadPath = Paths.get("uploads");

        if (!Files.exists(uploadPath)) {
            Files.createDirectories(uploadPath);
        }

        Path filePath = uploadPath.resolve(fileName);
        Files.copy(image.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);

        // 🔹 save product
        Product product = new Product();
        product.setName(name);
        product.setDescription(description);
        product.setPrice(price);
        product.setOldPrice(oldPrice);
        product.setQuantity(quantity);
        product.setBrand(brand);
        product.setCategory(category);
        product.setImageUrl("/uploads/" + fileName);

        return repo.save(product);
    }

    public List<Product> getAllProducts() {
        return repo.findAll();
    }

    public Product getProductById(Long id) {
        return repo.findById(id).orElse(null);
    }


    public Product updateProduct(Long id, Product updated) {
        Product p = getProductById(id);

        p.setName(updated.getName());
        p.setDescription(updated.getDescription());
        p.setPrice(updated.getPrice());
        p.setQuantity(updated.getQuantity());
        p.setOldPrice(updated.getOldPrice());
        p.setBrand(updated.getBrand());
        p.setCategory(updated.getCategory());

        return repo.save(p);
    }

    public boolean deleteProduct(Long id) {
        if (repo.existsById(id)) {
            repo.deleteById(id);
            return true;
        }
        return false;
    }

    public List<Product> getProductsByCategory(Long categoryId) {
        return repo.findByCategoryId(categoryId);
    }

    public List<String> getBrandsByCategory(Long categoryId) {
        return repo.findDistinctBrandsByCategoryId(categoryId);
    }

    public List<Product> getProductsByCategoryAndBrand(Long categoryId, String brand) {
        return repo.findByCategoryIdAndBrand(categoryId, brand);
    }
}
