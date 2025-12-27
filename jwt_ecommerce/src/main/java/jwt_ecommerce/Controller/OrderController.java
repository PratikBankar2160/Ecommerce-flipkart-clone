package jwt_ecommerce.Controller;

import jwt_ecommerce.Entity.Order;
import jwt_ecommerce.Service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/orders")
@CrossOrigin
public class OrderController {

    @Autowired
    private OrderService orderService;

    @PostMapping("/checkout/{cartId}")
    public Order checkout(@PathVariable Long cartId) {
        return orderService.checkout(cartId);
    }

}
