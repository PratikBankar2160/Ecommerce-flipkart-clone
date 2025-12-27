package jwt_ecommerce.DTO;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AddToCartRequest {
    private Long cartId;
    private Long productId;
    private int quantity;
}
