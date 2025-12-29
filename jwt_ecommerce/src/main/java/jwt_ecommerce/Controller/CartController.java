package jwt_ecommerce.Controller;

import jwt_ecommerce.DTO.AddToCartRequest;
import jwt_ecommerce.DTO.CartItemResponse;
import jwt_ecommerce.DTO.CartResponse;
import jwt_ecommerce.DTO.UpdateCartItemRequest;
import jwt_ecommerce.Entity.Cart;
import jwt_ecommerce.Entity.CartItem;
import jwt_ecommerce.Repository.CartRepository;
import jwt_ecommerce.Service.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/cart")
@CrossOrigin("*")
public class CartController {

    @Autowired
    private CartService cartService;

    @Autowired
    private CartRepository repo;

//    @PostMapping("/add")
//    public CartItem addToCart(@RequestBody AddToCartRequest request) {
//        return cartService.addToCart(request);
//    }

    @PostMapping("/add")
    public CartItemResponse addToCart(@RequestBody AddToCartRequest request) {
        return cartService.addToCart(request);
    }

    @PostMapping("/create")
    public Cart createCart() {
        return repo.save(new Cart());
    }

    @GetMapping("/{cartId}")
    public CartResponse viewCart(@PathVariable Long cartId) {
        return cartService.viewCart(cartId);
    }

    @PutMapping("/update")
    public CartItem updateCartItem(@RequestBody UpdateCartItemRequest request) {
        return cartService.updateQuantity(request);
    }

    @DeleteMapping("/remove/{cartItemId}")
    public String removeCartItem(@PathVariable Long cartItemId) {
        cartService.removeItem(cartItemId);
        return "Item removed from cart";
    }

}
