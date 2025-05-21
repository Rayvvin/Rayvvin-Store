export function buildOrderEmailContext(order: any) {
    return {
      customerEmail: order.customer.email,
      customerName: `${order.customer.first_name} ${order.customer.last_name}`,
      orderId: order.id,
      orderDate: new Date(order.created_at || order.date).toLocaleDateString(),
      orderTotal: parseFloat(order.total).toFixed(2),
      currency: order.region.currency_code.toUpperCase(),
      status: order.status,
      items: order.items.map((item: any) => ({
        title: item.title,
        description: item.description || item.variant?.title,
        thumbnail: item.thumbnail,
        quantity: item.quantity,
        price: (parseFloat(item.total) / 100).toFixed(2),
      })),
      isChildOrder: order.metadata?.type === "childOrder",
      parentOrderId: order.metadata?.parent || null,
      paymentStatus: order.payments?.[0]?.data?.status || "unknown",
    };
  }
  
  export function buildCustSignupContext(data: any) {
    const { first_name, last_name, email, phone } = data;
    if (!first_name || !last_name || !email || !phone) {
      throw new Error("Missing required customer signup fields.");
    }
    return {
      first_name,
      last_name,
      email,
      phone,
      companyName: process.env.COMPANY_NAME || "Afriomarket Stores",
    };
  }
  
  export function buildNewsletterContext(data: any) {
    const { email, title, body } = data;
    if (!email || !title || !body) {
      throw new Error("Missing required newsletter fields.");
    }
    return {
      email,
      title,
      body,
      companyName: process.env.COMPANY_NAME || "Afriomarket Stores",
    };
  }
  