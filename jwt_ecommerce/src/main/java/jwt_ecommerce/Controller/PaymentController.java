package jwt_ecommerce.Controller;

import jwt_ecommerce.Entity.Payment;
import jwt_ecommerce.Service.PaymentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/payments")
public class PaymentController {

    @Autowired
    private PaymentService paymentService;

    @PostMapping("/cod/{orderId}")
    public Payment payByCod(@PathVariable Long orderId) {
        return paymentService.codPayment(orderId);
    }
}
