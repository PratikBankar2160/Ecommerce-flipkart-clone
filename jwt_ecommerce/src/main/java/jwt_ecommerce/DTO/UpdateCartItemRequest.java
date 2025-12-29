package jwt_ecommerce.DTO;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UpdateCartItemRequest {

    private Long cartItemId;
    private int quantity;

    // getters & setters
}
