package jwt_ecommerce.DTO;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CartItemResponse {

    private Long itemId;
    private int quantity;
    private double price;

    private Long productId;
    private String productName;

    private double subTotal; // price * quantity
}
