ALTER TABLE "Order"
ADD CONSTRAINT "Order_closedAt_terminal_ck"
CHECK (("status" IN ('COMPLETED', 'REJECTED', 'CANCELLED')) = ("closedAt" IS NOT NULL));
