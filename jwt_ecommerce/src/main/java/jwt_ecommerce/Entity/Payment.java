package jwt_ecommerce.Entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "payments")
public class Payment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    private PaymentMethod paymentMethod;  // COD, RAZORPAY

    @Enumerated(EnumType.STRING)
    private PaymentStatus paymentStatus;  // PENDING, SUCCESS, FAILED

    private double amount;

    @OneToOne
    @JoinColumn(name = "order_id")
    private Order order;
}

