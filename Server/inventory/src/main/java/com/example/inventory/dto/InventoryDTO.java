package com.example.inventory.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor

public class InventoryDTO {
    private int inventoryId;
    private int itemId;
    private int productId;
    private int quantity;
}
