package com.example.order.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor

public class OrderDTO {
    private int orderId;
    private int itemId;
    private String orderDate;
    private int amount;
}
