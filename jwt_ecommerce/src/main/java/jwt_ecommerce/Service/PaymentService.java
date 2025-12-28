package jwt_ecommerce.Service;

import jwt_ecommerce.Entity.Order;
import jwt_ecommerce.Entity.Payment;
import jwt_ecommerce.Repository.OrderRepository;
import jwt_ecommerce.Repository.PaymentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PaymentService {

    @Autowired
    private OrderRepository orderRepo;

    @Autowired
    private PaymentRepository paymentRepo;

    public Payment codPayment(Long orderId) {

        Order order = orderRepo.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found"));

        Payment payment = new Payment();
        payment.setOrder(order);
        payment.setAmount(order.getTotalAmount());
        payment.setPaymentMethod("COD");
        payment.setPaymentStatus("SUCCESS");

        // update order status
        order.setStatus("PAID");
        orderRepo.save(order);

        return paymentRepo.save(payment);
    }
}
