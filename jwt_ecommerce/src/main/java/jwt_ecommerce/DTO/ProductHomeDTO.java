package jwt_ecommerce.DTO;

import lombok.Data;

@Data
public class ProductHomeDTO {
    private Long id;
    private String name;
    private double price;
    private Double oldPrice;
    private String imageUrl;
}
