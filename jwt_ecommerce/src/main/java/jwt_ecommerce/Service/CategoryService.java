package jwt_ecommerce.Service;

import jwt_ecommerce.DTO.CategoryHomeDTO;
import jwt_ecommerce.DTO.ProductHomeDTO;
import jwt_ecommerce.Entity.Category;
import jwt_ecommerce.Entity.Product;
import jwt_ecommerce.Repository.CategoryRepository;
import jwt_ecommerce.Repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CategoryService {

    private final CategoryRepository categoryRepo;

    @Autowired
    private ProductRepository productRepository;

    public CategoryService(CategoryRepository categoryRepo) {
        this.categoryRepo = categoryRepo;
    }

    public Category addCategory(Category category) {
        return categoryRepo.save(category);
    }

    public List<Category> getAllCategories() {
        return categoryRepo.findAll();
    }


    public List<CategoryHomeDTO> getCategoriesForHome() {

        return categoryRepo.findAll().stream().map(category -> {

            CategoryHomeDTO dto = new CategoryHomeDTO();
            dto.setId(category.getId());
            dto.setName(category.getName());
            dto.setDescription(category.getDescription());

            List<ProductHomeDTO> products =
                    productRepository.findTop4ByCategoryIdOrderByIdDesc(category.getId())
                            .stream()
                            .map(this::mapToProductDTO)
                            .collect(Collectors.toList());

            dto.setProducts(products);
            return dto;

        }).collect(Collectors.toList());
    }

    private ProductHomeDTO mapToProductDTO(Product product) {
        ProductHomeDTO dto = new ProductHomeDTO();
        dto.setId(product.getId());
        dto.setName(product.getName());
        dto.setPrice(product.getPrice());
        dto.setOldPrice(product.getOldPrice());
        dto.setImageUrl(product.getImageUrl());
        return dto;
    }
}
