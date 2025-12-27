package jwt_ecommerce.Service;

import jwt_ecommerce.Entity.Cart;
import jwt_ecommerce.Entity.CartItem;
import jwt_ecommerce.Entity.Order;
import jwt_ecommerce.Entity.OrderItem;
import jwt_ecommerce.Repository.CartRepository;
import jwt_ecommerce.Repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class OrderService {

    @Autowired
    private CartRepository cartRepo;

    @Autowired
    private OrderRepository orderRepo;

    public Order checkout(Long cartId) {

        Cart cart = cartRepo.findById(cartId)
                .orElseThrow(() -> new RuntimeException("Cart not found"));

        Order order = new Order();
        order.setStatus("PLACED");

        double total = 0;

        List<OrderItem> orderItems = new ArrayList<>();

        for (CartItem cartItem : cart.getItems()) {
            OrderItem item = new OrderItem();
            item.setProduct(cartItem.getProduct());
            item.setQuantity(cartItem.getQuantity());
            item.setPrice(cartItem.getPrice());
            item.setOrder(order);

            total += cartItem.getQuantity() * cartItem.getPrice();
            orderItems.add(item);
        }

        order.setItems(orderItems);
        order.setTotalAmount(total);

        cart.getItems().clear(); // empty cart

        return orderRepo.save(order);
    }
}
