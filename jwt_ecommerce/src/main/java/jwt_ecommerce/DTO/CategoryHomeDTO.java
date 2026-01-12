package jwt_ecommerce.DTO;

import lombok.Data;
import java.util.List;

@Data
public class CategoryHomeDTO {
    private Long id;
    private String name;
    private String description;
    private List<ProductHomeDTO> products;
}
