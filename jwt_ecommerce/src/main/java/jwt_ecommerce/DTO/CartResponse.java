package jwt_ecommerce.DTO;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class CartResponse {

    private Long cartId;
    private List<CartItemResponse> items;
    private double totalAmount;

    // getters & setters
}
